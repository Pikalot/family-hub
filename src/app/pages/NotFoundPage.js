import style from '../../components/Components.module.css';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={style['hero']}>
            <div>
                <h1>
                    Nothing here
                </h1>
                <h1>
                    <Link href='/'>U turn now</Link>
                </h1>
            </div>
        </div >
    )
}