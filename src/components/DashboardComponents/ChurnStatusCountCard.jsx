import React from 'react'

export default function ChurnStatusCountCard({styleCard, titleCount, countChurn}) {
    return (
        <div className={styleCard}>
            <span>{titleCount}</span>
            <span className="number">{countChurn}</span>
        </div>
    )
    }
