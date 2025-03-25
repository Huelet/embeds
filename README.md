# embeds



# Running 
- 

### Production
```
docker build -t novapro/huelet_video_embedding . && docker tag novapro/huelet_video_embedding registry.xnet.com:5000/novapro/huelet_video_embedding:latest && docker push registry.xnet.com:5000/novapro/huelet_video_embedding
```

### Locally
```

npm i -legacy-peer-deps


npm run build


serve -s build -l 5006```
```
docker stop huelet_video_embedding && docker rm huelet_video_embedding && docker build -t huelet_video_embedding . && docker run --name huelet_video_embedding -p 5007:5007 huelet_video_embedding

docker build -t novapro/huelet_video_embedding . && docker run --name huelet_video_embedding -p 5007:5007 novapro/huelet_video_embedding
```