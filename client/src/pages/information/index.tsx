import React, { useState } from 'react';
import styles from '../information/index.module.css';
import { Layout } from '../../components/layout';
interface Player {
    id: number;
    name: string;
    status: string;
    role?: string;
}

function Log({ message }: { message: string }) {
    return <div className={styles.log}>{message}</div>;
}

function MafiaTool() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [nightResults, setNightResults] = useState<{ [key: string]: string }>({});
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([]);

    const addPlayer = () => {
        const newPlayer: Player = {
            id: players.length + 1,
            name: newPlayerName || `Игрок ${players.length + 1}`,
            status: 'Жив',
        };
        setPlayers([...players, newPlayer]);
        setNewPlayerName('');
        setLogs([...logs, `Добавлен игрок: ${newPlayer.name}`]);
    };

    const killPlayer = (id: number) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, status: 'Убит' } : player
        );
        setPlayers(updatedPlayers);
        const playerName = updatedPlayers.find(player => player.id === id)?.name;
        setLogs([...logs, `Убит игрок: ${playerName}`]);
    };

    const checkPlayer = (id: number) => {
        const playerToCheck = players.find(player => player.id === id);
        if (playerToCheck && playerToCheck.role === 'Мафия') {
            setLogs([...logs, `${playerToCheck.name} - мафия`]);
        } else {
            setLogs([...logs, `${playerToCheck?.name} - мирный`]);
        }
    };

    const healPlayer = (id: number) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, status: 'Вылечен' } : player
        );
        setPlayers(updatedPlayers);
        const playerName = updatedPlayers.find(player => player.id === id)?.name;
        setLogs([...logs, `Вылечен игрок: ${playerName}`]);
    };

    const markRole = (id: number, role: string) => {
        const updatedPlayers = players.map(player =>
            player.id === id ? { ...player, role } : player
        );
        setPlayers(updatedPlayers);
        const playerName = updatedPlayers.find(player => player.id === id)?.name;
        setLogs([...logs, `Отмечена роль ${role} для игрока: ${playerName}`]);
    };

    const finishNight = () => {
        const killedPlayers = players.filter(player => player.status === 'Убит');
        const healedPlayers = players.filter(player => player.status === 'Вылечен');
        setLogs([
            ...logs,
            `Убитые игроки: ${killedPlayers.map(player => player.name).join(', ')}`,
            `Вылеченные игроки: ${healedPlayers.map(player => player.name).join(', ')}`,
        ]);
    };

    return (
        <Layout>
      
        <div className={styles.mafiaTool}>
            <div className={styles.controls}>
                <input
                    type="text"
                    value={newPlayerName}
                    onChange={e => setNewPlayerName(e.target.value)}
                    placeholder="Имя нового игрока"
                />
                <button onClick={addPlayer}>Добавить игрока</button>
                <button onClick={finishNight}>Завершить ночь</button>
            </div>
            <div className={styles.playerList}>
                <h2>Список игроков:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Имя игрока</th>
                            <th>Статус</th>
                            <th>Действия</th>
                            <th>Роль</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map(player => (
                            <tr key={player.id}>
                                <td>{player.name}</td>
                                <td>{player.status}</td>
                                <td>
                                    <button onClick={() => killPlayer(player.id)}>Убить</button>
                                    <button onClick={() => checkPlayer(player.id)}>Проверить</button>
                                    <button onClick={() => healPlayer(player.id)}>Вылечить</button>
                                </td>
                                <td>
                                    <select
                                        value={player.role || ''}
                                        onChange={e => markRole(player.id, e.target.value)}
                                    >
                                        <option value="">Выберите роль</option>
                                        <option value="Мафия">Мафия</option>
                                        <option value="Дон мафии">Дон мафии</option>
                                        <option value="Комиссар">Комиссар</option>
                                        <option value="Доктор">Доктор</option>
                                        <option value="Любовница">Любовница</option>
                                        <option value="Маньяк">Маньяк</option>
                                        <option value="Мирный житель">Мирный житель</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.logs}>
                <h2>Логи:</h2>
                {logs.map((log, index) => (
                    <Log key={index} message={log} />
                ))}
            </div>
        </div>
        </Layout>
    );
}

export default MafiaTool;
