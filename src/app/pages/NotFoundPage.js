import style from '../../components/Components.module.css'

export default function NotFound() {
    return (
        <div className={style['hero']}>
            <div>
                <h1>
                    Nothing here
                </h1>
                <h1>
                    <a href='/'>U turn now</a>
                </h1>
            </div>
        </div >
    )
}