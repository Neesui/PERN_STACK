import React from 'react'
import Navbar from './components/Navbar'
import Tablelist from './components/Tablelist'
import Modelform from './components/Modelform'

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [modalMode, setmodalMode] = React.useState('add');

  const handleOpen = (mode) =>{
    setIsOpen(true)
  }
  const handleSubmit = () =>{
    if(mode === 'add'){
      console.log('modal mode add')
    } else{
      console.log('modal mode edit')
    }
  }
  return (
    <div className=''>
      <Navbar  onOpen={()=> handleOpen('add')}/>
      <Tablelist />
      <Modelform 
      isOpen={isOpen} onSubmit={handleSubmit}
      onClose ={() => setIsOpen(false)} />
    </div>
  )
}

export default App