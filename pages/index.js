import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import styled from 'styled-components'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
 
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
function ProfileSideBar(props){
  console.log(props)
  return(
  <Box as="aside">
      <img src= {`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px'}} />
      <hr />
      <p>
          <a className="boxLink" href={"https://github.com/${props.gitHubUser}"}>
              @{props.gitHubUser}
          </a>
      </p>
      
      <hr />

      <AlurakutProfileSidebarMenuDefault/>
  </Box>
  )
}

function ProfileRelationsBox(propriedades){

  return(
    <ProfileRelationsBoxWrapper>
    <h2 className="smallTitle">
      {propriedades.title}: {propriedades.qtd}
      </h2>
      <ul>
        {propriedades.items.map((itemAtual) => {
            return(
          <li key={itemAtual}>
              <a href={'/users/${itemAtual.login}'}>
              <img src={"https://github.com/" + itemAtual.login + ".png"} />
              <span>{itemAtual.login}</span>
            </a>
        </li>
            )

        })}
        </ul>


    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const gitHubUser = 'VictorKobinski';
  const [comunidades, setComunidades] = React.useState([]);
  // const comunidades = comunidades[0];
  // const alteraComunidades = comunidades[1];

  const PessoasFavoritas = [
    'juunegreiros', 
    'omariosouto',
    'marcobrunodev',
    'zThanael',
    'felipefialho',
    'peas'
  ]

  const [seguidores, setSeguidores] = React.useState([]);
  const [qtdSeguidores, setQtdSeguidores] = React.useState([]);

  React.useEffect(function() {
    fetch('https://api.github.com/users/VictorKobinski/followers')
    .then(function (dadosDoServidor) {
      if(dadosDoServidor.ok){
        return dadosDoServidor.json();
      }
      console.log(dadosDoS)
    })
    .then(function(respostaCompleta){
      const qtdSe = respostaCompleta.length;
      setQtdSeguidores(qtdSe);
      while(respostaCompleta.length > 6){
        respostaCompleta.pop(-1)
      }
      setSeguidores(respostaCompleta);
    })

    //Api GraphQL
    fetch("https://graphql.datocms.com/", {
      method: 'POST',
      headers: {
        'Authorization': "fb71008ae86cfafb36c89209d02671",
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
            title
            imageUrl
            id
            }
          }`
     })

      })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;

        setComunidades(comunidadesVindasDoDato); 
      })

  }, []);

  return (
  <>
    <AlurakutMenu githubUser={gitHubUser}/>
    <MainGrid>

      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
      <ProfileSideBar gitHubUser={gitHubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box >
          <h1 className="title">
          Bem Vindo
          </h1>

        <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
          <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = response.json();
                console.log(dados);

                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              })

              
          }} >
            <div>
              <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade?" 
              />
            </div>
            <div>
              <input 
              placeholder="Coloque uma URL para usarmos de capa:" 
              name="image"
              aria-label="Coloque uma URL para usarmos de capa:" 
              />
            </div>

            <button>
              Criar comunidade
            </button>

          </form>

        </Box>
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBox title="Seguidores" items={seguidores} qtd={qtdSeguidores} />

        <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          Comunidades: {comunidades.length}
          </h2>

          <ul>
            {comunidades.map((itemAtual) => {
                return(
              <li key={itemAtual.id}>
                  <a href={'/users/${itemAtual.title}'}>
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
            </li>
                )

            })}
            </ul>


        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Pessoas da comunidade: {PessoasFavoritas.length}
          </h2>


          <ul>

          {PessoasFavoritas.map((itemAtual) => {
              if(PessoasFavoritas.length > 6){
                PessoasFavoritas.pop(-1);
              }


              return(
            <li key={itemAtual}>
                <a href={'/users/${itemAtual}'}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
           </li>
              )

          })}
          </ul>

        </ProfileRelationsBoxWrapper>  
      </div>
      
      
    </MainGrid>
  </>
  )
}
