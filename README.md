# embeds



# Running 
- 

### Production
```
docker build -t novapro/huelet_embedding . && docker tag novapro/huelet_embedding registry.xnet.com:5000/novapro/huelet_embedding:latest && docker push registry.xnet.com:5000/novapro/huelet_embedding
```

### Locally
```

npm i -legacy-peer-deps


npm run build


serve -s build -l 5006```
```
docker stop huelet_embedding && docker rm huelet_embedding && docker build -t huelet_embedding . && docker run --name huelet_embedding -p 5006:5006 huelet_embedding

docker build -t novapro/huelet_embedding . && docker run --name huelet_embedding -p 5006:5006 novapro/huelet_embedding
```