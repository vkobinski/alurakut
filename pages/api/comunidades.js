import { SiteClient } from "datocms-client";

export default async function recebedorDeRequests(request, response){

    if(request.method == 'POST' ){
        const TOKEN = 'c482825b7beed1eced7742002d07e6';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
        itemType: "972691",
        ...request.body,
        /* title: "Comunidade De Teste",
        imageUrl: "https://github.com/VictorKobinski.png", */
    })

    response.json({
        dados: "Algum dado qualquer",
        registroCriado: registroCriado,
    })
    return;
    }

    response.status(404).json({
        message: "Ainda não temos nada no GET, mas, sim no POST!"
    })

}