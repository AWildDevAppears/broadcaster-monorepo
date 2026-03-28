FROM vllm/vllm-openai:latest

USER root
RUN apt-get update && apt-get install -y ffmpeg sox git && rm -rf /var/lib/apt/lists/*

# Install the specific audio/omni extensions for Voxtral
RUN pip install --no-cache-dir vllm[audio]
RUN pip install --no-cache-dir git+https://github.com/vllm-project/vllm-omni.git

ENTRYPOINT ["vllm"]
