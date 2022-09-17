interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <button>
      {props.title}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button title="send 1" />
      <Button title="send 2" />
      <Button title="send 3" />
    </div>
  )
}

export default App
