import React from 'react';
import goldMedal from '../assets/goldMedal.png';
import silverMedal from '../assets/silverMedal.png';
import bronzeMedal from '../assets/bronzeMedal.png';

export const Board = ({ ranking }) => {
    const medals = [goldMedal, silverMedal, bronzeMedal];

    return (
        <div className="board">
            <h1 className='leaderboard'>LEADERBOARD</h1>

            <div className="podium">
                {ranking.slice(0, 3).map((user, index) => (
                    <div key={index} className={`place place${index + 1}`}>
                        <span>{user.username}</span>
                        <img src={medals[index]} alt={`place ${index + 1}`} className="podium-image" />
                    </div>
                ))}
            </div>

            <table className="ranking-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Username</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {ranking.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}