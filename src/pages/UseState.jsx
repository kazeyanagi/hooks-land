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

import { useState } from 'react';

import Title from '../components/Title';
import Body from '../components/Body';
import Form from '../components/Form';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import fruits from '../data/fruits';


const Component1Unstate = () => {
  let count = 0 
  const increment = () => count++
  const decrement = () => count--

  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </>
  ) 
}


const Component1State = () => {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </>
  ) 
}

const Component2Multiple = () => {
  const [name, setName] = useState('')
  const [fruit, setFruit] = useState(0)
  const [value, setValue] = useState(0)

  const nameChangeHandler = (e) => {
    setName(e.target.value)
  }

  const fruitChangeHandler = (e) => {
    setFruit(e.target.value)
  }
  
  const valueChangeHandler = (e) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Form>
          <Stack direction="column">
            <TextField
              name="name"
              label="name"
              value={name}
              onChange={nameChangeHandler}
            />
            <TextField
              name="fruit"
              label="fruit"
              select
              value={fruit}
              onChange={fruitChangeHandler}
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
              value={value}
              onChange={valueChangeHandler}
            />
          </Stack>
        </Form>
        {name && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            py: 1
          }}>
            <Typography sx={{flex: 1}}>{name}さんの支払金額</Typography>
            <Typography sx={{alignSelf: 'flex-end'}}>{fruit * value} 円</Typography>
          </Box>
        )}
      </Stack>
    </>
  )
}


const Component2Compact = () => {
  const [form, setForm] = useState({
    name: '',
    fruit: 0,
    value: 0
  })

  const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setForm({
      ...form,
      [name]: value
    })
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

const Component3Failed = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment + 3</Button>
    </>
  ) 
}


const Component3TmpValiable = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    let tmp = count
    tmp++
    tmp++
    tmp++
    setCount(tmp)
  }
  
  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment + 3</Button>
    </>
  ) 
}

const Component3Prev = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
  }
  
  return (
    <>
      <Typography>カウント: {count}</Typography>
      <Button onClick={increment}>increment + 3</Button>
    </>
  ) 
}

const ComponentEx1 = () => {
  const [idx, setIdx] = useState(0)
  const fruit = fruits[idx]

  return (
    <>
      <Card sx={{display: 'inline-block', flexDirection: 'column', flex: 0, width: 200, py: 1, px: 2}}>
        <Stack direction="row" sx={{justifyContent: 'space-between'}}>
          <Button>prev</Button>
          <Button>next</Button>
        </Stack>
        <Stack direction="row" sx={{justifyContent: 'space-between'}}>
          <Typography>果物名:</Typography>
          <Typography>{fruit.name}</Typography>
        </Stack>
        <Stack direction="row" sx={{justifyContent: 'space-between'}}>
          <Typography>単価:</Typography>
          <Typography>{fruit.price}円</Typography>
        </Stack>
      </Card>
    </>
  )
}

const ComponentEx2 = () => {
  const [pocket, setPocket] = useState(3000)
  const [histories, setHistories] = useState([])
  const [form, setForm] = useState({
    fruit: 0,
    value: 0
  })

  return (
    <>
      <Card sx={{display: 'inline-block', flexDirection: 'column', flex: 0, width: 400, height: 195, py: 1, px: 2}}>
        <Stack direction="row" spacing={1}>
          <Form sx={{flex: 0}}>
            <TextField
              name="fruit"
              label="fruit"
              select
              value={form.fruit}
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
            />
            <Box>
              <Button>add</Button>
            </Box>
          </Form>
          <Divider orientation="vertical" flexItem/>
          <Box sx={{flex: 1}}>
            <Stack direction="row" sx={{justifyContent: 'space-between'}}>
              <Typography>所持金:</Typography>
              <Typography>{pocket}円</Typography>
            </Stack>
            <Box sx={{
              overflowY: 'auto',
              height: 150
            }}>
              {histories.map((history, idx) => (
                <Typography key={idx} variant='caption' component="p" align="right">{history}円</Typography>
              ))}
            </Box>
          </Box>
        </Stack>
      </Card>
    </>
  )
}

const UseState = () => {
  return (
    <>
      <Title>useStateのページ</Title>
      <Body>
        <Section title="Stateの更新">
          <SubSection title="Stateなし">
            <Component1Unstate/>
          </SubSection>
          <SubSection title="Stateあり">
            <Component1State/>
          </SubSection>
        </Section>
        <Section title="入力フォーム">
          <SubSection title="個々に状態を定義する場合">
            <Component2Multiple/>
          </SubSection>
          <SubSection title="まとめて状態を定義する場合">
            <Component2Compact/>
          </SubSection>
        </Section>
        <Section title="一度に複数回の更新">
          <SubSection title="更新が上手くいかないパターン">
            <Component3Failed/>
          </SubSection>
          <SubSection title="更新する情報を一度変数に逃がす">
            <Component3TmpValiable/>
          </SubSection>
          <SubSection title="更新にprevを使用するパターン">
            <Component3Prev/>
          </SubSection>
        </Section>
        <Section title="やってみる">
          <SubSection title="フルーツの詳細を切り替え">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>nextボタンを押すことで次のフルーツの情報を表示</Typography></li>
              <li><Typography>prevボタンを押すことで前のフルーツの情報を表示</Typography></li>
              <li><Typography>配列の範囲外を参照されないようにする</Typography></li>
            </ul>
            <ComponentEx1/>
          </SubSection>
          <SubSection title="フルーツ購入機能">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>フルーツと個数を選択し、ADDボタンを押すとhistoriesに合計金額が追加される</Typography></li>
              <li><Typography>historiesに追加される値が、pokectを超えていたら追加しない</Typography></li>
              <li><Typography>historiesに追加された値分、pocketから値を引く</Typography></li>
            </ul>
            <ComponentEx2/>
          </SubSection>
        </Section>
      </Body>
    </>
  )
}

export default UseState;