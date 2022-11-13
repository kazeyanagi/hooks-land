import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Divider
} from '@mui/material'

import { useState, useContext, createContext } from 'react';

import ToggleComponent from '../components/ToggleComponent';
import Title from '../components/Title';
import Body from '../components/Body';
import Form from '../components/Form';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import fruits from '../data/fruits';
import users from '../data/users';

const HelloContext = createContext(undefined)

const HelloProvider = ({children}) => {
  const [text, setText] = useState('Hello World!')
  const changeHandler = (e) => setText(e.target.value)
  return (
    <>
      <Form>
        <TextField
          label="text"
          value={text}
          onChange={changeHandler}
        />
      </Form>
      <HelloContext.Provider value={text}>
        {children}
      </HelloContext.Provider>
    </>
  )
}

const Component1Deep = ({children}) => {
  return (
    <Box>
      text: {children}
    </Box>
  )
}

const Component1DeepChild = () => {
  const text = useContext(HelloContext)
  return (
    <Typography component="span">{text}</Typography>
  )
}

const ColorContext = createContext(undefined)

const ColorProvider = ({children}) => {
  const [color, setColor] = useState(undefined)

  const changeHandler = (e) => setColor(e.target.value) 

  return (
    <>
      <Form>
        <TextField
          label="color"
          select
          value={color}
          onChange={changeHandler}
        >
          <MenuItem value="#f44336">red</MenuItem>
          <MenuItem value="#2196f3">blue</MenuItem>
          <MenuItem value="#4caf50">green</MenuItem>
          <MenuItem value="#ffeb3b">yellow</MenuItem>
        </TextField>
      </Form>
      <ColorContext.Provider value={color}>
        {children}
      </ColorContext.Provider>
    </>
  )
}

const NotColorProvider = ({children}) => {
  const [color, setColor] = useState(undefined)

  const changeHandler = (e) => setColor(e.target.value)

  return (
    <>
      <Form>
        <TextField
          label="color"
          select
          value={color}
          onChange={changeHandler}
        >
          <MenuItem value="#f44336">red</MenuItem>
          <MenuItem value="#2196f3">blue</MenuItem>
          <MenuItem value="#4caf50">green</MenuItem>
          <MenuItem value="#ffeb3b">yellow</MenuItem>
        </TextField>
      </Form>
      <>
        {children}
      </>
    </>
  )
}

const Component1Flat1 = () => {
  const color = useContext(ColorContext)
  return (
    <Typography sx={{color: color, fontWeight: 700}}>Installation</Typography>
  )
}


const Component1Flat2 = () => {
  const color = useContext(ColorContext)
  return (
    <Typography>
      <Typography component="span" sx={{color: color}}>React</Typography> has been designed from the start for gradual adoption. You can use as little or as much <Typography component="span" sx={{color: color}}>React</Typography> as you need. Whether you want to get a taste of <Typography component="span" sx={{color: color}}>React</Typography>, add some interactivity to an HTML page, or start a complex <Typography component="span" sx={{color: color}}>React-powered</Typography> app, this section will help you get started.
    </Typography>
  )
}

const FullnameContext = createContext(undefined)

const FullnameProvider = ({children}) => {
  const [fullname, setFullname] = useState({
    firstname: '',
    lastname: ''
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFullname(prev => ({
      ...prev,
      [name]: value
    }))
  };

  return (
    <FullnameContext.Provider value={{fullname, changeHandler}}>
      {children}
    </FullnameContext.Provider>
  )
}

const Component2Welcome = () => {
  const {fullname} = useContext(FullnameContext)

  return (
    <>
      {fullname.firstname !== '' && fullname.lastname !== '' && (
        <Typography>Hi, {fullname.lastname} {fullname.firstname}!</Typography>
      )}
    </>
  )

}

const Component2Firstname = () => {
  const {fullname, changeHandler} = useContext(FullnameContext)

  return (
    <Form>
      <TextField
        label="firstname"
        name="firstname"
        value={fullname.firstname}
        onChange={changeHandler}
      />
    </Form>
  )
}


const Component2Lastname = () => {
  const {fullname, changeHandler} = useContext(FullnameContext)

  return (
    <Form>
      <TextField
        label="lastname"
        name="lastname"
        value={fullname.lastname}
        onChange={changeHandler}
      />
    </Form>
  )
}



const ComponentExLoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // todo
  }
  return (
    <Form onSubmit={submitHandler} sx={{display: 'inline-block'}}>
      <Typography variant="caption" component="p" align="center" sx={{pt: 1}}>ログインページ</Typography>
      <Stack>
        <TextField
          label="email"
          name="email"
          value={form.email}
          onChange={changeHandler}
        />
        <TextField
          label="password"
          name="password"
          type="password"
          value={form.password}
          onChange={changeHandler}
        />
        <Button>
          Login
        </Button>
      </Stack>
    </Form>
  )
}

const ComponentExMyPage = () => {
  const user = {}
  return (
    <Box sx={{pt: 1, px: 2}}>
      <Typography>Hi, {user?.username}!</Typography>
      <img src={user?.profile} alt={user?.username}/>
    </Box>
  )
}

const ComponentEx = () => {
  const login = true
  return (
    <Card sx={{display: 'inline-block', minHeight: 200, width: 240}}>
      {login
        ? (
          <ComponentExLoginForm/>
        ): (
          <ComponentExMyPage/>
        )
      }
    </Card>

  )
}

const UseContext = () => {
  return (
    <>
      <Title>useContextのページ</Title>
      <Body>
        <Section title="コンテキストを使用した、データの受け渡し">
          <SubSection title="ツリーが深くなった子コンポーネントに渡す">
            <HelloProvider>
              <Component1Deep>
                <Component1DeepChild/>
              </Component1Deep>
            </HelloProvider>
          </SubSection>
          <SubSection title="同じ階層の子コンポーネントに渡す">
            <ColorProvider>
              <Component1Flat1/>
              <Component1Flat2/>
            </ColorProvider>
          </SubSection>
          <SubSection title="プロバイダー毎に別々の状態を持つ">
            <ColorProvider>
              <Component1Flat1/>
              <Component1Flat2/>
            </ColorProvider>
          </SubSection>
          <SubSection title="もちろんプロバイターの子コンポーネントでなければ、コンテキストを使用することはできない">
            <NotColorProvider>
              <Component1Flat1/>
              <Component1Flat2/>
            </NotColorProvider>
          </SubSection>
        </Section>
        <Section title="子コンポーネントからコンテキストのデータを操作">
          <SubSection title="子要素にハンドラーを渡し、Stateを更新">
            <FullnameProvider>
              <Component2Welcome/>
              <Component2Firstname/>
              <Component2Lastname/>
            </FullnameProvider>
          </SubSection>
        </Section>
        <Section title="やってみる">
          <SubSection title="ログインぽいの">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>コンテキストを作成し、ログインユーザー情報とログイン用のハンドラーをプロバイダーに渡す</Typography></li>
              <li><Typography>ログイン用のハンドラー内で、入力されたメールアドレスとパスワードから一致するユーザーを取得(ユーザー情報は /src/data/users.js にある)</Typography></li>
              <li><Typography>ログインに成功するとマイページに表示を切り替える</Typography></li>
              <li><Typography>マイページでコンテキストからログインユーザーの情報を受け取り、ユーザー情報を表示</Typography></li>
            </ul>
            <ComponentEx/>
          </SubSection>
        </Section>
      </Body>
    </>
  )
}

export default UseContext;