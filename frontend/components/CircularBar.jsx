import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularBar(props) {
    const percentage = props.percent;

    return (
        <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
                textColor: 'white',
                trailColor: '#0d6efd',
                pathColor: 'green',
                textSize: '24px',
                // backgroundColor: 'white',
            })}
            // style={{color:"black"}}
            />
        </div>
    );
}

export default CircularBar;