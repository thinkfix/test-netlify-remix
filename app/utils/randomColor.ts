export const randomColor = (step = 30,  rangeArr = [0,360]) => {
    const max = rangeArr[1] / step;
    const rand = Math.floor(Math.random() * (max - rangeArr[0] + 1) + rangeArr[0]);
    const key = 'bg'+rand * step;

    const colorVariants:{ [key: string]: string } = {
        'bg0': 'bg-te-primary-0',
        'bg30': 'bg-te-primary-30',
        'bg60': 'bg-te-primary-60',
        'bg90': 'bg-te-primary-90',
        'bg120': 'bg-te-primary-120',
        'bg150': 'bg-te-primary-150',
        'bg180': 'bg-te-primary-180',
        'bg210': 'bg-te-primary-210',
        'bg240': 'bg-te-primary-240',
        'bg270': 'bg-te-primary-270',
        'bg300': 'bg-te-primary-300',
        'bg330': 'bg-te-primary-330',
        'bg360': 'bg-te-primary-360',
    }

    return colorVariants[key] ;
}