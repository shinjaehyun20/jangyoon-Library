import gc
import json
import os
import time
from pathlib import Path

import torch

BOOK_JSON = Path(r"D:\workspace\projects\active\jangyoon-library\src\data\books\north-wind-and-the-sun.json")
OUTPUT_DIR = Path(r"D:\workspace\projects\active\jangyoon-library\public\illustrations\volume-01")
SD35_MODEL_DIR = r"D:\workspace\tools\ComfyUI\models\diffusers\stable-diffusion-3.5-large"
SD35_CKPT = r"D:\workspace\tools\ComfyUI\models\checkpoints\sd3.5_large.safetensors"

WIDTH = 1024
HEIGHT = 768
STEPS = 20
CFG = 4.4
BASE_SEED = 2026050901

NEGATIVE_PROMPT = (
    "text, words, letters, subtitles, captions, watermark, logo, signature, "
    "blurry, low quality, deformed, extra limbs, scary, horror, dark violence, "
    "corporate poster, ui elements, frame, border, speech bubble, typography"
)

STYLE_PREFIX = (
    "premium 3D children's storybook illustration, warm friendly animated film look, "
    "original soft clay and toy material texture, safe and easy for a first grade child to read alone, "
    "clear silhouette, expressive face, low visual clutter, cozy morning light, "
    "simple readable composition, gentle educational mood, no text in image"
)


def load_book():
    return json.loads(BOOK_JSON.read_text(encoding="utf-8"))


def build_prompts(book):
    prompts = [
        (
            "cover.png",
            (
                f"{STYLE_PREFIX}, cover illustration for a children's storybook titled The North Wind and the Sun, "
                "a kind golden sun in the sky, a playful cloud-like north wind swirling nearby, "
                "a small traveler in a blue coat on a country road, dawn sky turning softly gold, "
                "safe and encouraging mood, balanced cover composition, centered focal point, "
                "picture book art for an eight year old child"
            ),
        )
    ]

    for index, scene in enumerate(book["scenes"], start=1):
        prompt = (
            f"{STYLE_PREFIX}, scene {index} of The North Wind and the Sun, "
            f"{scene['illustrationPrompt']}, "
            "same traveler character with round face and blue coat, "
            "same kind golden sun character and same playful cloud-like north wind character across all scenes, "
            "storybook page art, clear foreground subject, readable emotion at a glance, "
            "landscape composition, no text"
        )
        prompts.append((f"{scene['id']}.png", prompt))
    return prompts


def load_pipeline():
    from diffusers import StableDiffusion3Pipeline
    from transformers import CLIPTextModelWithProjection, CLIPTokenizer, T5EncoderModel, T5TokenizerFast

    print("[1/2] Loading SD3.5 text encoders...")
    te1 = CLIPTextModelWithProjection.from_pretrained(
        os.path.join(SD35_MODEL_DIR, "text_encoder"), torch_dtype=torch.bfloat16
    )
    te2 = CLIPTextModelWithProjection.from_pretrained(
        os.path.join(SD35_MODEL_DIR, "text_encoder_2"), torch_dtype=torch.bfloat16
    )
    te3 = T5EncoderModel.from_pretrained(
        os.path.join(SD35_MODEL_DIR, "text_encoder_3"), torch_dtype=torch.bfloat16
    )
    tok1 = CLIPTokenizer.from_pretrained(os.path.join(SD35_MODEL_DIR, "tokenizer"))
    tok2 = CLIPTokenizer.from_pretrained(os.path.join(SD35_MODEL_DIR, "tokenizer_2"))
    tok3 = T5TokenizerFast.from_pretrained(os.path.join(SD35_MODEL_DIR, "tokenizer_3"))

    print("[2/2] Loading SD3.5 pipeline...")
    pipe = StableDiffusion3Pipeline.from_single_file(
        SD35_CKPT,
        text_encoder=te1,
        text_encoder_2=te2,
        text_encoder_3=te3,
        tokenizer=tok1,
        tokenizer_2=tok2,
        tokenizer_3=tok3,
        torch_dtype=torch.bfloat16,
    )
    pipe.enable_sequential_cpu_offload()
    print("Pipeline ready.")
    return pipe


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    book = load_book()
    prompts = build_prompts(book)
    only = os.environ.get("ONLY_FILE")
    if only:
      prompts = [item for item in prompts if item[0] == only]
      if not prompts:
          raise SystemExit(f"ONLY_FILE did not match any prompt: {only}")

    pipe = load_pipeline()
    generated = []
    print(f"Output: {OUTPUT_DIR}")

    for index, (filename, prompt) in enumerate(prompts, start=1):
        target = OUTPUT_DIR / filename
        print(f"[{index}/{len(prompts)}] Generating {filename}...")
        started = time.time()
        generator = torch.Generator(device="cpu").manual_seed(BASE_SEED + index)
        image = pipe(
            prompt=prompt,
            negative_prompt=NEGATIVE_PROMPT,
            width=WIDTH,
            height=HEIGHT,
            num_inference_steps=STEPS,
            guidance_scale=CFG,
            generator=generator,
        ).images[0]
        image.save(target)
        generated.append(str(target))
        print(f"[{index}/{len(prompts)}] Saved {target} ({time.time() - started:.1f}s)")
        del image
        gc.collect()
        torch.cuda.empty_cache()

    print("Generated files:")
    for path in generated:
        print(path)
    print("DONE_SUCCESS")


if __name__ == "__main__":
    main()
