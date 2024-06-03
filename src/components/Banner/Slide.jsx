import PropTypes from 'prop-types'
import { Typewriter } from 'react-simple-typewriter'

const Slide = ({ title, description, image }) => {
    return (
        <div className="md:grid grid-cols-2 items-center  md:px-24 py-5 md:py-10 mt-5">
            <div className=" space-y-7 px-5">
                <h1 className="text-2xl md:text-5xl font-bold">
                    <Typewriter words={[title]}>
                    </Typewriter>
                </h1>
                <p className="text-[#737373]">{description}</p>
                <button className="btn bg-[#202020] hover:bg-[#3d3d3d] text-white">Read more</button>
            </div>
            <div className='px-5 mt-5'>
                <img src={image} />
            </div>
        </div>
    );
};

export default Slide;
Slide.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.any
}