import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Dialog, MenuItem, MenuList, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { rootShouldForwardProp } from '@mui/material/styles/styled';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


function App() {
  const [notes , setNotes] = useState([])
  const [open  , setOpen] = useState(false)
  const [edit , setEdit] = useState(false)
  const [sub , setSub] = useState({})
  const [mode  , setMode] = useState('light')
  const [txt , setTxt] = useState('')
  const [displayPro, setDisplayPro] =useState([])
  const [delCon  , setDelCon] = useState(false)
  const [msg , setMsg] = useState(false)
  const [msg2 , setMsg2] = useState(false)

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  // });

  // const action = (
  //   <React.Fragment>
  //     <i>
  //       <CloseIcon />
  //     </i>
  //   </React.Fragment>
  // )

  const add_note = (event)=>{
    event.preventDefault();
    let h = event.target.heading.value;
    event.target.heading.value = ''
    let d = event.target.description.value;
    event.target.description.value  =''
    let t = new Date();
    let da  = t.toLocaleDateString();
    let tt = t.toLocaleTimeString();
    setMsg(true);
    setNotes([{h, d , da , tt}  , ...notes]);
  }
  const edit_item = (event)=>{
    event.preventDefault();
    let h = event.target.heading.value;
    let d = event.target.description.value;
    let ind = notes.indexOf(sub)
    notes[ind].h = h;
    notes[ind].d = d;
    setEdit(false)
    setNotes([...notes])
    setMsg2(true);
  }
  const delete_item = ()=>{
    let ind = notes.indexOf(sub)
    notes.splice(ind , 1)
    setNotes([...notes])
    setOpen(false)
    setDelCon(false)
  }
  const toggle_mode = ()=>{
    if(mode==='light'){
      setMode('dark')
    }
    else{
      setMode('light')
    }
  }
  useEffect(()=>{
    let t = notes.filter((item)=>(item.h).toLowerCase().includes(txt.toLowerCase()) || (item.d).toLowerCase().includes(txt.toLowerCase()) || txt==='')
    setDisplayPro([...t])

  },[txt , notes])


  useEffect(()=>{
    var r = document.querySelector(':root');
    if(mode==='dark'){
      r.style.setProperty('--white' , 'rgb(52, 53, 54)')
      r.style.setProperty('--yellow' , 'rgb(52, 53, 54)')
      r.style.setProperty('--black' , '#FFFFFF')
    }
    else{
      r.style.setProperty('--white' , '#FFFFFF')
      r.style.setProperty('--yellow' , '#FFC72C')
      r.style.setProperty('--black' , '#000000')
    }
  },[mode])


  return (
    <div className="App">

      <div className='navbar same'>
        <img src='./note.png' alt='#' />
        <input autoFocus type='search' placeholder='Find Your Notes Here...' onChange={(event)=>setTxt(event.target.value)} />
        {
          mode==='light' ? <i className='mode' onClick={toggle_mode}><LightModeRoundedIcon sx={{color:'white'}} /></i> :
          <i className='mode2' onClick={toggle_mode}><DarkModeRoundedIcon /></i>
        }
        
        
      </div>
      
      <form onSubmit={add_note}>
      <div className="add_notes">
        <input required name="heading" type="text" placeholder='Heading' />
        <textarea required name="description" type='text' placeholder='Description' />
        <div className="form_buttons">
          <button type='submit'>Add</button>
          <button style={{backgroundColor:'slategray'}} type='reset'>Reset</button>
        </div>

      </div>
      </form>

      <div className="card-list">
        {
          displayPro.length === 0 ? notes.length > 0 ? <h1 className="ERR">No Data found!!</h1> : <h1 className='welcome'>Welcome To Notes App</h1> :
          displayPro.map((item , index) => 
            
              <div key={index} className="card same">
                <div className="time">
                  <p>{item.da} <br />at {item.tt}</p>
                  <p><i onClick={()=>{setOpen(true);setSub(item)}}><MoreVertIcon /></i></p>

                </div>
                <div className='head'>
                  <p>{item.h}</p>
                </div>
                <div className='desc'>
                  <p>
                    {item.d}
                  </p>
                </div>
              </div>
            
          )}
        
      </div>
      <Modal
        open = {open}
        onClose = {()=>{setOpen(false)}}
      >
        <div className="card modal">
          <div className="time">
            <p>{sub.da} <br />at {sub.tt}</p>
            <p className='icons'>
              <i className="edit" onClick={()=>{setEdit(true);setOpen(false);}}><EditIcon /></i> 
              <i className="del" onClick={()=>setDelCon(true)}><DeleteIcon /></i>
            </p>

          </div>
          <div className='head'>
            <p>{sub.h}</p>
          </div>
          <div className='desc'>
            <p>
              {sub.d}
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        open={edit}
        onClose={()=>{setEdit(false)}}
      >
        
          <div className="modal edit-modal">
            <form onSubmit={(event)=>edit_item(event)}>
              <input name="heading" type="text" placeholder='Heading' defaultValue={sub.h} />
              <textarea defaultValue={sub.d} rows={5} columns={5} name="description" type='text' placeholder='Description' />
              <div className="form_buttons">
                <button type='submit'>Update</button>
              </div>
              </form>
          </div>
        
      </Modal>

      <Dialog 
        open={delCon}
        onClose={()=>{setDelCon(false)}}
      >
        <div className="cnfm-box">
          <p>Are You Sure?</p>
          <p className='cnf-btn'>
            <button className='del-btn' onClick={delete_item}>Delete</button>
            <button style={{backgroundColor:'slategray'}} onClick={()=>setDelCon(false)}>Cancel</button>
          </p>
        </div>

      </Dialog>

      <Snackbar
        open={msg}
        autoHideDuration={2000}
        onClose={()=>{setMsg(false)}}
        message='Successfully Added'
       />

      <Snackbar
        open={msg2}
        autoHideDuration={2000}
        onClose={()=>{setMsg2(false)}}
        message='Update Successfully'
       />
    </div>
  );
}

export default App;
