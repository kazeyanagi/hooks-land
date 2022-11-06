import {
  Box,
  Card,
  TextField,
  Typography
} from '@mui/material'

import { useState, useEffect } from 'react';

import ToggleComponent from '../components/ToggleComponent';
import Title from '../components/Title';
import Body from '../components/Body';
import Form from '../components/Form';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import fruits from '../data/fruits';

const Component1Undep = () => {
  const [count, setCount] = useState(0) 

  useEffect(() => {
    setCount(prev => prev + 1)
  });
  return (
    <>
      <Typography>カウント: {count}</Typography>
    </>
  )
}

const Component1EmptyDep = () => {
  const [count, setCount] = useState(0) 

  useEffect(() => {
    setCount(prev => prev + 1)
  }, []);
  return (
    <>
      <Typography>カウント: {count}</Typography>
    </>
  )
}

const Component1Dep = () => {
  const [summary, setSummary] = useState(0);
  const [form, setForm] = useState({
    num1: 0,
    num2: 0
  });

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [name]: Number(value)
    })
  };

  useEffect(() => {
    setSummary(form.num1 + form.num2)
  }, [form]);
  return (
    <Form>
      <TextField
        type="number"
        name="num1"
        label="num1"
        value={form.num1}
        onChange={changeHandler}
      />
      <TextField
        type="number" 
        name="num2"
        label="num2"
        value={form.num2}
        onChange={changeHandler}
      />
      <Typography>合計: {summary}</Typography>
    </Form>
  )
}

const Component2Failed = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      console.log('update')
      setCount(prev => prev + 1)
    }, 1000);
  }, [])

  return (
    <>
      <Typography>{count}</Typography>
    </>
  )
}

const Component2Success = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      console.log('update')
      setCount(prev => prev + 1)
    }, 1000);

    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <>
      <Typography>{count}</Typography>
    </>
  )
}

const ComponentEx = () => {
  const [search, setSearch] = useState('')
  const [fruitList, setFruitList] = useState(fruits)

  return (
    <>
      <TextField
        label="search"
      />
      <Box sx={{display: 'flex', mt: 2}}>
        <Card sx={{px: 4, py: 2, '& ul': {pl: 2}}}>
          <Typography align="center">検索結果</Typography>
          <ul>
            {fruitList.map(fruit => (
              <li>{fruit.name}: {fruit.price}</li>
            ))}
          </ul>
        </Card>
      </Box>
    </>
  )
}



const UseEffect = () => {
  return (
    <>
      <Title>useEffectのページ</Title>
      <Body>
        <Section title="初期表示時にEffectを使用して、Stateを更新">
          <SubSection title="無限ループに陥るパターン">
            <ToggleComponent>
              <Component1Undep/>
            </ToggleComponent>
          </SubSection>
          <SubSection title="初期レンダリングのみ実行されるパターン">
            <ToggleComponent>
              <Component1EmptyDep/>
            </ToggleComponent>
          </SubSection>
          <SubSection title="依存先の状態が更新した時に実行されるパターン">
            <ToggleComponent>
              <Component1Dep/>
            </ToggleComponent>
          </SubSection>
        </Section>
        <Section title="Effect内での、非同期または、、、">
          <SubSection title="上手く行かないパターン">
            <ToggleComponent>
              <Component2Failed/>
            </ToggleComponent>
          </SubSection>
          <SubSection title="上手く行くパターン">
            <ToggleComponent>
              <Component2Success/>
            </ToggleComponent>
          </SubSection>
        </Section>
        <Section title="やってみる">
          <SubSection title="インクリメンタルサーチっぽいの">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>テキストフィールドに入力された文字が、果物の名前に部分的に一致するものを表示</Typography></li>
              <li><Typography>テキストフィールドが更新されるたび、検索結果を更新</Typography></li>
              <li><Typography>一致するものがない場合は、'表示する果物がありません'と表示</Typography></li>
            </ul>
          </SubSection>
          <ComponentEx/>
        </Section>
      </Body>
    </>
  )
}

export default UseEffect;