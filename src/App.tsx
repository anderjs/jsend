import { Flex } from "./components/Flex"

function App() {
  return (
    <div style={{ height: "100vh", backgroundColor: "#333"}}> 
      <Flex justifyContent="start" gap={4}>
        <div>
          Flex
        </div>
        <div>
          In React
        </div>
      </Flex>
    </div>
  )
}

export default App
