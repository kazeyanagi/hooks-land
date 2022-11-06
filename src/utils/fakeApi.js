const data = [
  {
    title: 'Go shopping at the market',
    detail: 'x2 carrot x1 milk'
  },
  {
    title: 'Make a phone call',
    detail: 'father(xxx-xxxx-xxxx)'
  },
  {
    title: 'Go to get a haircut',
    detail: 'Shinjuku, Tokyo'
  }
];

const fakeTodoApi = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, 1000)
  })
}

export default fakeTodoApi;