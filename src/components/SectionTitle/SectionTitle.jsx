import PropTypes from 'prop-types'

const SectionTitle = ({subHeading,heading}) => {
    return (
        <div className="text-center space-y-3">
            <p className="uppercase tracking-widest text-[#ff9e32]">{subHeading}</p>
            <h3 className="text-3xl font-medium text-mainColor">{heading}</h3>
        </div>
    );
};

export default SectionTitle;
SectionTitle.propTypes={
    subHeading:PropTypes.string,
    heading:PropTypes.string,
}