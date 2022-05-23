import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import { v4 as uuid } from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2/promise";

type AdRecordResults = [AdRecord[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
        }

        if (obj.description.length > 1000){
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
        }

        //@T0DO: Check if URL is valid!
        if (!obj.url || obj.url.length > 100){
            throw new ValidationError('Link ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number'){
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.id = obj.id;
        this.name = obj.name ;
        this.description = obj.description ;
        this.price = obj.price ;
        this.url = obj.url ;
        this.lat = obj.lat ;
        this.lon = obj.lon ;
    }

    static async getOne(id: string): Promise<AdRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        // console.log("tutaj")
        // console.log(results);

        return results.length === 0 ? null : new AdRecord(results[0]) ;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }else{
            throw new Error('Cannot insert something that is already inserted!');
        }

        console.log({newIdFromInsert: this.id});

        await pool.execute("INSERT INTO `ads` (`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)",
            this
        );

        return this.id
    };

    static async findAll(name: string): Promise<SimpleAdEntity[]>{
        // if(adName){
            const [results] = (await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search",
                {
                    search: `%${name}%`
                }
                )) as AdRecordResults;

            return results.map((result)=> {
                const {id, lat, lon} = result;

                return {id, lat, lon};
            }

            );

    }


}




