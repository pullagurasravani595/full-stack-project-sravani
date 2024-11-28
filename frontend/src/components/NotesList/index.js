import {useState, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid'
import { Oval } from 'react-loader-spinner';
import NoteCard from '../NoteCard'
import './index.css';

const apiStatusConstraints = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
};

const NotesList = () => {
    const [apiStatus, setApiStatus] = useState(apiStatusConstraints.initial);
    const [data, setNotesData] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    useEffect(() => {
        const getNotesDetails = async() => {
            setApiStatus(apiStatusConstraints.inProgress)
            const url = "http://localhost:3000/notes";
            const response = await fetch(url);
            const responseData = await response.json();
            if (response.ok === true) {
                setApiStatus(apiStatusConstraints.success);
                setNotesData(responseData)
            }else {
                setApiStatus(apiStatusConstraints.failure);
            }
        }
        getNotesDetails()
    },[])

    const changeTitle = event => {
        setTitle(event.target.value)
    }

    const changeCategory = event => {
        setCategory(event.target.value)
    }

    const changeDescription = event => {
        setDescription(event.target.value);
    }

    const changeCreatedDate = event => {
        setCreatedAt(event.target.value)
    }

    const changeUpdatedAt = event => {
        setUpdatedAt(event.target.value)
    }

    const addNewNote = async event => {
        event.preventDefault()
        const noteDetails = {
            id: uuidv4(),
            title,
            description,
            category, 
            createdAt,
            updatedAt
        }
        
        const url = "http://localhost:3000/notes";
        const options = {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
            },
             body: JSON.stringify(noteDetails)
         }
        const response = await fetch(url, options);
        console.log(response.ok);
        const newNoteData = await response.json();
        setNotesData(newNoteData);
        setTitle('');
        setDescription('');
        setCategory('');
        setCreatedAt('');
        setUpdatedAt('')
    }
    

    const renderSuccessView = () => (
        <ul className='unorderlist-container'>
            {data.map(eachNote => (
                <NoteCard noteDetails={eachNote} />
            ))}
        </ul>
    )
    

    const renderFailureView = () => (
        <div>
            <img src="" alt="failure" />
            <h1>no notes</h1>
        </div>
    )

    const renderLoaderView = () => (
        <div>
            <Oval
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />

        </div>
    )

    const renderResponseDetails = () => {
        switch(apiStatus) {
            case apiStatusConstraints.success:
                return renderSuccessView();
            case apiStatusConstraints.failure:
                return renderFailureView();
            case apiStatusConstraints.inProgress:
                return renderLoaderView();
            default:
                return null;    
        }
    }

    return (
        <div className='notes-list-container'>
            <div className='total-form-container'>
                <div>
                    <h1>Creates New Note</h1>
                </div>
                <form className='form-element' onSubmit={addNewNote}>
                    <div className='title-category-container'>
                        <div className='label-input-container'>
                            <label htmlFor='title'>title:</label>
                            <input type="text" placeholder='Enter the Title' id="title" className='input' onChange={changeTitle} value={title} />
                        </div>
                        <div className='label-input-container'>
                            <label htmlFor='category'>Category:</label>
                            <input type="text" placeholder='Enter the Category' id="category" className='input' value={category} onChange={changeCategory} />
                        </div>
                    </div>
                    <div className='text-area-container'>
                        <label htmlFor='description'>description:</label>
                        <textarea cols="8" rows="6" id="description" placeholder="Enter the Description" className='text-area' value={description} onChange={changeDescription}></textarea>
                    </div>
                    <div className='title-category-container'>
                        <div className='label-input-container'>
                            <label htmlFor='createdat'>CreatedAT:</label>
                            <input type="date" id="createdat" className='input' value={createdAt} onChange={changeCreatedDate} />
                        </div>
                        <div className='label-input-container'>
                            <label htmlFor='category'>UpdatedAt:</label>
                            <input type="date" id="category" className='input' value={updatedAt} onChange={changeUpdatedAt} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className='add-btn'>Add Note</button>
                    </div>
                </form>
            </div>
            {renderResponseDetails()}
        </div>
    )
}

export default NotesList