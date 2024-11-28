
import './index.css'

const NoteCard = (props) => {
    const {noteDetails} = props;
    const {title, description, category} = noteDetails;
    return (
        <li>
            <h5>{title}</h5>
            <p>{description}</p>
            <p>{category}</p>
        </li>
    )
}

export default NoteCard