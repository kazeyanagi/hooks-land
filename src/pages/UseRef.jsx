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

import { useState, useContext, createContext, useRef, useEffect } from 'react';

import ToggleComponent from '../components/ToggleComponent';
import Title from '../components/Title';
import Body from '../components/Body';
import Form from '../components/Form';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import fruits from '../data/fruits';
import users from '../data/users';

const Component1State = () => {
  const [id, setId] = useState(undefined)
  const [count, setCount] = useState(0)

  const startHandler = () => {
    if (!id) {
      setId(setInterval(() => {
        setCount(prev => prev + 1)
      }, 100))
    }
  }

  const stopHandler = () => {
    if (id) {
      clearInterval(id)
      setId(undefined)
    }
  }

  return (
    <Box>
      <Typography>
        カウント: {count}
      </Typography>
      <Box>
        <Button onClick={startHandler}>
          Start
        </Button>
        <Button onClick={stopHandler}>
          Stop
        </Button>
      </Box>
    </Box>
  )
}

const Component1Ref = () => {
  const intervalRef = useRef(undefined)
  const [count, setCount] = useState(0)

  const startHandler = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1)
      }, 100)
    }
  }

  const stopHandler = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }

  return (
    <Box>
      <Typography>
        カウント: {count}
      </Typography>
      <Box>
        <Button onClick={startHandler}>
          Start
        </Button>
        <Button onClick={stopHandler}>
          Stop
        </Button>
      </Box>
    </Box>
  )
}

const Component2DomRef = () => {
  const ref = useRef(undefined)
  const [text, setText] = useState('')

  const changeHandler = (e) => {
    setText(e.target.value)
  }

  const stateClickHandler = () => {
    alert(text)
  }

  const refClickHandler = () => {
    alert(ref.current.value)
  }
  return (
    <>
      <input multiple value={text} onChange={changeHandler}/>
      <Box>
        <Button onClick={stateClickHandler}>state alert</Button>
      </Box>
      <input multiple ref={ref}/>
      <Box>
        <Button onClick={refClickHandler}>ref alert</Button>
      </Box>
    </>
  )
}

const Component2DomEvent = () => {
  const leftRef = useRef(undefined)
  const rightRef = useRef(undefined)
  const moveRef = useRef(undefined)

  const dragHandler = (e) => {
    moveRef.current = e.target
  }

  const dragOverHandler = (e) => {
    e.preventDefault()
  }

  const dropHandler = (e) => {
    e.preventDefault()
    console.log(e.target)
    e.currentTarget.append(moveRef.current)

  }

  useEffect(() => {
    if (leftRef.current) {
      leftRef.current.addEventListener('drop', dropHandler)
      leftRef.current.addEventListener("dragover", dragOverHandler)
      leftRef.current.addEventListener('dragstart', dragHandler)
      const dom = leftRef.current
      return () => {
        dom.removeEventListener('drop', dropHandler)
        dom.removeEventListener('dragover', dragOverHandler)
        dom.removeEventListener('dragstart', dragHandler)
      }
    }
  }, [])

  useEffect(() => {
    if (rightRef.current) {
      rightRef.current.addEventListener('drop', dropHandler)
      rightRef.current.addEventListener("dragover", dragOverHandler)
      rightRef.current.addEventListener('dragstart', dragHandler)
      const dom = rightRef.current
      return () => {
        dom.removeEventListener('drop', dropHandler)
        dom.removeEventListener('dragover', dragOverHandler)
        dom.removeEventListener('dragstart', dragHandler)
      }
    }
  }, [])

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box sx={{width: 200, minHeight: 300}}>
          <Typography align="center" sx={{borderBottom: '1px solid #2b2b2b'}}>Left</Typography>
          <Stack ref={leftRef} sx={{p: 2, height: '100%'}} spacing={1}>
            <Card draggable sx={{textAlign: 'center', p: 1, '& > *': {pointerEvents: 'none'}}}>
              Hello
            </Card>
            <Card draggable sx={{textAlign: 'center', p: 1, '& > *': {pointerEvents: 'none'}}}>
              World
            </Card>
            <Card draggable sx={{textAlign: 'center', p: 1, '& > *': {pointerEvents: 'none'}}}>
              !
            </Card>
          </Stack>
        </Box>
        <Box sx={{width: 200}}>
          <Typography align="center" sx={{borderBottom: '1px solid #2b2b2b'}}>Right</Typography>
          <Stack ref={rightRef} sx={{p: 2, height: '100%'}} spacing={1}>
          </Stack>
        </Box>

      </Stack>
    </Box>
  )
}

const ComponentEx = () => {
  return (
    <Card sx={{display: 'inline-block', height: '270px'}}>
      <video controls src="https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4" type="video/mp4"></video>
    </Card>

  )
}

const UseRef = () => {
  return (
    <>
      <Title>useRefのページ</Title>
      <Body>
        <Section title="useRefを使用した状態管理">
          <SubSection title="Stateの場合">
            <Component1State/>
          </SubSection>
          <SubSection title="Refの場合">
            <Component1Ref/>
          </SubSection>
        </Section>
        <Section title="DOMを操作する">
          <SubSection title="DOMの状態を取得する">
            <Component2DomRef/>
          </SubSection>
          <SubSection title="イベントリスナーを登録する">
            <Component2DomEvent/>
          </SubSection>
        </Section>
        <Section title="やってみる">
          <SubSection title="動画プレイヤーぽいの">
            <Typography variant="h4">要件</Typography>
            <ul>
              <li><Typography>useRefを使用して、動画を再生する</Typography></li>
              <li><Typography>動画上に再生・停止ボタンを用意</Typography></li>
            </ul>
            <ComponentEx/>
          </SubSection>
        </Section>
      </Body>
    </>
  )
}

export default UseRef;