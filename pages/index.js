import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import styled from 'styled-components'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AluraKutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
 
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
function ProfileSideBar(props){
  console.log(props)
  return(
  <Box>
      <img src= {`https://github.com/${props.gitHubUser}.png`} style={{ borderRadius: '8px'}} />
  </Box>
  )
}

export default function Home() {

  const gitHubUser = 'VictorKobinski';

  const PessoasFavoritas = [
    'juunegreiros', 
    'omariosouto',
    'marcobrunodev',
    'rafaballerini',
    'felipefialho',
    'peas'
  ]

  return (
  <>
    <AlurakutMenu/>
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
      </div>
      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
          Pessoas da comunidade: {PessoasFavoritas.length}
          </h2>


          <ul>
          {PessoasFavoritas.map((itemAtual) => {
              return(
            <li>
                <a href={'/users/${itemAtual}'} key={itemAtual}>
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
