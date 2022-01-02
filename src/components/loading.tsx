import { CircularProgress } from "@material-ui/core";


const Loading = () => {
    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50 %, -50 %)' }}>
            <CircularProgress color="inherit" />
        </div>
    );
};

export default Loading;