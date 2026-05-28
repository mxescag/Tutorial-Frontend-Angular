import { Client } from "../../client/model/Client";
import { Game } from "../../game/model/Game";

export interface Loan {
    id: number;
    client: Client;
    game: Game;
    /* Las fechas las ponemos como string porque String(backend) deserializa LocalDate como string */
    startDate: string;
    endDate: string; 
}