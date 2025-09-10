## Matriculador

## Comandos GiT Básicos

Quando atualizar qulquer coisa, e queira mandar para github usa essa sequência de comandos:

git add .  # Ele adiciona todos os arquivos modifiados 
git commit -m "<Descrição do commit>" # mensagem/comentários do commit
git push origin main # comando para madar para github obs: *origin main* é a breach que tu está *main*


Quando Você quiser pegar a versão do github:

git pull # Ele a ultima versão que foi enviada para o github

OBS: Cuidado quando você for mandar uma versão nova e ja existir uma nova no github,
você tem que está na mesma versão do ultimo commit para enviar uma atualização, 
se outra pessoa ja mandou, você vai ter um conflito de mergin.


Obs: Tem um arquivo chamado .gitignore qualquer arquivo que estiver nele, ele não vai para github