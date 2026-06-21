import React from 'react'

export default function ChurnStatusCountCard({styleCard, titleCount, countChurn}) {
    return (
        <div className={styleCard}>
            <span style={{ fontFamily: "Roboto, sans-serif"}}>{titleCount}</span>
            <span className="number" style={{ fontFamily: "Roboto, sans-serif"}}>{countChurn}</span>
        </div>
    )
    }
