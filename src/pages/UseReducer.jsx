import {createContext, useContext, useEffect, useReducer, useState} from 'react';
import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Divider
} from '@mui/material';

import Title from '../components/Title';
import Body from '../components/Body';
import Form from '../components/Form';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import fruits from '../data/fruits';


const Component1State = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
  }

  const decrement = () => {
    setCount(prev => prev - 1)
  }

  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </>
  )
}

const countReducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}

const Component1Reducer = () => {
  const [count, dispatch] = useReducer(
    countReducer,
    0
  )

  const increment = () => {
    dispatch({type: 'increment'})
  }

  const decrement = () => {
    dispatch({type: 'decrement'})
  }

  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </>
  )
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}

const Component2Form = () => {
  const [form, dispatch] = useReducer(
    formReducer,
    {
      name: '',
      fruit: '',
      value: ''
    }
  )

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    dispatch({type: 'change', name, value})
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Form>
          <Stack direction="column">
            <TextField
              name="name"
              label="name"
              value={form.name}
              onChange={changeHandler}
            />
            <TextField
              name="fruit"
              label="fruit"
              select
              value={form.fruit}
              onChange={changeHandler}
            >
              <MenuItem value={0}> -- </MenuItem>
              {fruits.map(option => (
                <MenuItem key={option.name} value={option.price}>{option.name}</MenuItem>
              ))}
            </TextField>
            <TextField
              name="value"
              label="value"
              type="number"
              value={form.value}
              onChange={changeHandler}
            />
          </Stack>
        </Form>
        {form.name && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1
          }}>
            <Typography sx={{flex: 1}}>{form.name}さんの支払金額</Typography>
            <Typography sx={{alignSelf: 'flex-end'}}>{form.fruit * form.value} 円</Typography>
          </Box>
        )}
      </Stack>
    </>
  )
}

const TimerContext = createContext(undefined)

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      if (state.base) {
        return {
          ...state,
          current: action.current - state.base
        }
      } else {
        const base = (new Date()).getTime() - state.current
        return {
          ...state,
          base: base,
          current: action.current - base
        }
      }
    case 'stop':
      return {
        ...state,
        base: undefined
      }
    case 'reset':
      return {
        ...state,
        base: undefined,
        current: 0,
        history: []
      }
    case 'lap':
      return {
        ...state,
        history: [
          ...state.history,
          state.current
        ]
      }
    default:
      return state
  }
}

const Component3Provider = ({children}) => {
  const [timer, dispatch] = useReducer(
    timerReducer,
    {
      base: undefined,
      current: 0,
      history: []
    }
  )
  
  return (
    <TimerContext.Provider value={{timer, dispatch}}>
      {children}
    </TimerContext.Provider>
  )
}

const Component3Display = () => {
  const {timer} = useContext(TimerContext)

  return (
    <Box>
      <Typography>
        {timer.current / 1000} Sec.
      </Typography>
    </Box>
  )
}

const Component3Buttons = () => {
  const [intervalId, setIntervalId] = useState(undefined)
  const {dispatch} = useContext(TimerContext)
  
  const startHandler = () => {
    if (!intervalId)  {
        const id = setInterval(() => {
          dispatch({type: 'update', current: (new Date()).getTime()})
        }, 10)
        setIntervalId(id)
    }
  }

  const stopHandler = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(undefined)
      dispatch({type: 'stop'})
    }
  }

  const lapHandler = () => {
    dispatch({type: 'lap'})
  }

  const resetHandler = () => {
    clearInterval(intervalId)
    setIntervalId(undefined)
    dispatch({type: 'reset'})
  }

  return (
    <Box>
      <Button onClick={startHandler}>Start</Button>
      <Button onClick={stopHandler}>Stop</Button>
      <Button onClick={lapHandler}>Lap</Button>
      <Button onClick={resetHandler}>Reset</Button>
    </Box>
  )
}

const Component3LapBoard = () => {
  const {timer} = useContext(TimerContext)
  return (
    <Box sx={{display: 'flex', mt: 2}}>
      <Card sx={{px: 4, py: 2, '& ul': {pl: 2}}}>
        <Typography align="center">Lap Board</Typography>
        <ul>
          {timer.history.map((item, idx) => (
            <li key={idx}>{idx}: {item / 1000} Sec.</li>
          ))}
        </ul>
      </Card>
    </Box>
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


const UseReducer = () => {
  return (
    <>
      <Title>useReducerのページ</Title>
      <Body>
        <Section title="Stateの更新">
          <SubSection title="Stateなし">
            <Component1State/>
          </SubSection>
          <SubSection title="Stateなし">
            <Component1Reducer/>
          </SubSection>
        </Section>
        <Section title="Formでの使用方法">
          <SubSection title="Formにreducerを使用した場合">
            <Component2Form/>
          </SubSection>
        </Section>
        <Section title="Reducerを使用したコンテキストの更新">
          <SubSection title="">
            <Component3Provider>
              <Component3Display/>
              <Component3Buttons/>
              <Component3LapBoard/>
            </Component3Provider>
          </SubSection>
        </Section>
        <Section title="やってみる">
          <SubSection title="ログインぽいの(Reducer ver)">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>コンテキストを作成し、ログインユーザー情報とReducerのdispatchをプロバイダーに渡す</Typography></li>
              <li><Typography>dispatchにログインアクションを作成し、入力されたメールアドレスとパスワードから一致するユーザーを取得(ユーザー情報は /src/data/users.js にある)</Typography></li>
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

export default UseReducer;