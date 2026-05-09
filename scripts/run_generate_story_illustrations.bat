@echo off
cd /d D:\workspace\projects\active\jangyoon-library
set PYTORCH_CUDA_ALLOC_CONF=backend:cudaMallocAsync
set PYTHONIOENCODING=utf-8
if not exist logs mkdir logs
"D:\workspace\env\python\py310-torch\Scripts\python.exe" -u scripts\generate_story_illustrations.py > logs\generate_story_illustrations.log 2>&1
echo EXITCODE=%ERRORLEVEL% >> logs\generate_story_illustrations.log
