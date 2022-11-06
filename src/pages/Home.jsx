import {
  Typography,
} from '@mui/material'


import Title from '../components/Title';
import Body from '../components/Body';


const Home = () => {
  return (
    <>
      <Title>Homeのページ</Title>
      <Body>
        <Typography>
          ReactのHooksを学習するためのWebアプリ。<br/>
          左にあるサイドメニューから、各Hooksについての挙動を確認することができるページになっている。
        </Typography>

      </Body>
    </>
  )
}

export default Home;