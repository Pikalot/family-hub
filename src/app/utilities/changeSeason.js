import CherryBlossomField from '@/components/visual-effect/CherryBlossomField';
import AutumnLeaves from '@/components/visual-effect/AutumnLeaves';
import DeepStarfield from '@/components/visual-effect/DeepStarfield';

function changeSeason({ season }) {
    // const season = 8; //new Date().getMonth();
    console.log("Current season month:", season);

    if (season > 1 && season <= 4) return <CherryBlossomField />;
    if (season > 7 && season <= 10) return <AutumnLeaves />;
    if (season > 10 || season <= 1) return <DeepStarfield />;
    return <></>;

}

export default changeSeason;