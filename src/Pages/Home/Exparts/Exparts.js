
import { Container, Row } from 'react-bootstrap';
import expart1 from '../../../images/experts/expert-1.jpg';
import expart2 from '../../../images/experts/expert-2.jpg';
import expart3 from '../../../images/experts/expert-3.jpg';
import expart4 from '../../../images/experts/expert-4.jpg';
import expart5 from '../../../images/experts/expert-5.jpg';
import expart6 from '../../../images/experts/expert-6.png';
import Expart from '../Expart/Expart';

const Exparts = () => {
    const experts = [
        { id: "1", name: "John Smith", img: expart1, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." },
        { id: "2", name: "Will Smith", img: expart2, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." },
        { id: "3", name: "Chris Roch", img: expart3, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." },
        { id: "4", name: "Dwayne Rock", img: expart4, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." },
        { id: "5", name: "Tanzim Rock", img: expart5, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." },
        { id: "6", name: "Stachy Jhonson", img: expart6, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, consectetur. Quas omnis dolores enim ipsam." }
    ];

    return (
        <Container id='Experts'>
            <h1 className='my-5 text-primary text-center'>Our Experts</h1>
            <Row className='g-5'>
                {
                    experts.map(expert => <Expart key={expert.id} expert={expert}></Expart>)
                }
            </Row>
        </Container>
    );
};

export default Exparts;