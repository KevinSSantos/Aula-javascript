//Features Add de Metas - Mostrar metas - Menu interativo

const { input, select, checkbox } = require('@inquirer/prompts');

console.log("=== Sistema de Metas ===");


let metas = [];

function limparTela() {
    console.clear();                    //limpando a tela do console
}




function mostrarMensagem(mensagem) {
    console.log(`\n${mensagem}\n`);
}



async function mostrarMenu() {
    const opcao = await select({
        message: "O que você deseja fazer?",
        choices: [
            { name: "Adicionar nova meta", value: "adicionar" },
            { name: "Mostrar todas as metas", value: "mostrar" },
            { name: "Marcar metas como concluídas", value: "marcar" },
            { name: "Mostrar metas realizadas", value: "realizadas" },
            { name: "Sair", value: "sair" }
        ]
    })

    return opcao;
}

async function executarAcao(opcao) {
    switch (opcao) {
        case "adicionar":
            await adicionarMeta();
            break;
        case "mostrar":
            await mostrarMetas();
            break;
        case "marcar":
            await marcarMetas();
            break;
        case "realizadas":
            await metasRealizadas();
            break;        
        case "sair":
            console.log("Saindo do sistema. Até mais!👋");
            break;
        default:
            console.log("❌ Opção inválida. Tente novamente.");
    }
}
//inicializando a lista de metas vazia

async function iniciar() {
    while (true) {
        const opcao = await mostrarMenu();

        if (opcao === "sair") {
            await executarAcao(opcao);
            break;
        }

        await executarAcao(opcao);
    }
}
//CRIANDO UMA FUÇÃO QUE ADICIONA A META ESCRITA

//esse async pq o input tem um tempo de delay 
//Função assincrona 
async function adicionarMeta() {
    const descricao = await input({
        message: "Digite sua nova Meta: "
    });

    if (descricao.length === 0) {
        mostrarMensagem("❌ Meta inválida. Tente novamente.")
        return;
    }

    //vira um objeto que inicia com o checked como false
    const novaMeta = {
        value: descricao, //q ta ali em cima
        checked: false
    }    //tem que mostrar o conteudo de onjeto

    metas.push(novaMeta);  //dps empurra pro banco de dados (let metas [])               //adicionando a nova meta à lista

    console.log("✅ Meta adicionada com sucesso!");

}

async function iniciar() {
    limparTela();
    mostrarMensagem("Bem-vindo ao sistema de metas pessoais!");

    while (true) {
        const opcao = await mostrarMenu();

        if (opcao === "sair") {
            await executarAcao(opcao);
            limparTela();
            mostrarMensagem("Até mais!👋");
            break;
        }

        await executarAcao(opcao);   //Para esperar um pouco 
    }            //chamando a função para adicionar a metawhile 
    //limpando a tela do console
}


async function mostrarMetas() {
    if (metas.length === 0) {               //se a lista de metas estiver vazia
        console.log("Nenhuma meta cadastrada.");
        return;
    }
    console.log("Suas metas são:");
    metas.forEach((meta, index) => {                //percorrendo a lista de metas
        const status = meta.checked ? "[x]" : "[ ]";   //Verifica se está checado ou não
        console.log(`${status} ${index + 1}. ${meta.value}`);
    });
}

//async function main(){  
//await adicionarMeta();               //chamando a função para adicionar a meta
//await mostrarMetas();                //chamando a função para mostrar as metas

async function marcarMetas() {
    if (metas.length === 0) {
        mostrarMensagem("Nenhuma meta cadastrada.");
        return;
    }                                                           //VER MAP tem q ver oq é esse trem 

    const metasSelecionadas = await checkbox({
        message: "Marque as metas que você concluiu:",
        choices: metas.map(meta =>
        ({
            name: meta.value,                                    //dá pra fazer a seleção 
            value: meta.value,
            checked: meta.checked
        }))

    })

    metas.forEach(meta => meta.checked = false); //desmarcando todas as metas

    metasSelecionadas.forEach(metaSelecionada => {
        const meta = metas.find(m => m.value === metaSelecionada);
        if (meta) {
            meta.checked = true; //marcando como concluída
        }
    });

    mostrarMensagem("✅ Metas atualizadas com sucesso!");

}

async function metasRealizadas() {
    const realizadas = metas.filter(meta => meta.checked);

    if (realizadas.length === 0) {
        mostrarMensagem("Nenhuma meta concluída ainda.");
        return;
    }
    
    console.log("Metas concluídas:");
    realizadas.forEach((meta, index) => {
        console.log(`${index + 1}. ${meta.value}`);
    });


 mostrarMensagem(`Parabens você já concluiou ${realizadas.length} metas! 🎉`);

}

iniciar();                             //chamando a função principal
/*console.log("Metas atualizadas:", metas.length);
adicionarMeta(); //chamando a função para adicionar a meta
console.log("Metas Finais:", metas);*/
//main();                                  //chamando a função principal



/*
//um objeto
let meta = { 
    value: "teste",
}

let metas = [ //Lista de metas
    { value: "Passar no curso" },
    { value: "Ler 2 livros por mês" },
    { value: "Viajar para o Chile" }
];

console.log("Meta indívidual:", meta.value);
console.log("Lista de metas:", metas);
//simulação do cadastro de uma pessoa
let pessoa = {
    nome: "João",
    idade: 30,
    metas: metas //associando a lista de metas à pessoa
};

console.log("Dados da pessoa cadastrada (idade):", pessoa.idade);*/