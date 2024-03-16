import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import User from './user.entity';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => User, (user: User) => user.address)
  public user?: User;

  constructor(id: number, street: string, city: string, country: string) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.country = country;
  }
}

export default Address;
