# Nest App

## Açıklama:

Bu klasör görevin asıl içeriğini barındırıyor. Bu hybrid NestJS uygulamasında 4 tane modül kullandım: auth, area, location ve son olarak logging. Bunların her biri için dockerfile yazdım (`devops` klasoründe görebilirsiniz). Daha sonra ise bunları docker-compose'da topladım.

## Çalıştırmak için:
```shell
bash ./build.sh
```

## Yayınlamak için:
`nginx` klasöründe hem yerel hem de üretim ortamı için ayarlama dosyaları yazdım.

## Dökümantasyon için:
`nginx` klasöründe yer alan sub-route'lara `/swagger` eklemeniz yeterli olacaktır.

<b>Örneğin:</b> `{{domain}}/area-module/swagger`

## Ek açıklama:
Aslında proje için verilen zamanın çoğu Kubernetes'e gitti. Ölçeklenebilirliği arttırmak adına girişmiştim, deployment'lara çok kompleks olmayan bir HPA eklemek istemiştim. Çeşitli sorunlarla karşılaştım çoğunu çözdüm fakat en son Ingress ekleme konusunda, nginx-ingress ile sorun yaşadım. Projenin teslim tarihini esneteceğini düşündüğüm için devam edemedim ve projeden kaldırmak durumunda kaldım.