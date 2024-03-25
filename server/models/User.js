import {Schema, model} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'Vartotojo vardas privalomas'],
    min: [3, 'Per trumpas naudotojo vardas'],
    max: [25, 'Per ilgas naudotojo vardas'],
  },
  name: {
    type: String,
    required: [true, 'Vardas privalomas'],
    minLength: [3, 'Per trumpas vardas'],
    maxLength: [25, 'Per ilgas vardas'],
  },
  surname: {
    type: String,
    required: [true, 'Pavardė privaloma'],
    minLength: [3, 'Per trumpa pavardė'],
    maxLength: [25, 'Per ilga pavardė'],
  },
  politicalParty: {
    type: String,
    minLength: [3, 'Per trumpas partijos pavadinimas'],
    maxLength: [50, 'Per ilgas partijos pavadinimas'],
    required: [true, 'Nurodykite partijos pavadinimą'],
  },
  email: {
    type: String,
    validate: {
      validator: (email) => /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email),
      message: () => 'Netinkamas pašto adreso formatas',
    },
    required: [true, 'Pašto adresas - privalomas'],
    unique: [true, 'Toks pašto adresas jau egzisutoja'],
    minLength: [8, 'Per trumpas el. pašto adresas'],
    maxLength: [50, 'Per ilgas el. pašto adresas'],
  },
  password: {
    type: String, validate: {
      validator: (password)=> /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(password),
      message: () => 'Slaptažodis privalo turėti specialų simbolį, didžiąją raidę ir skaičių',
    },
    required: [true, 'Slaptažodis yra privalomas'],
    minLength: [8, 'Per trumpas slaptažodis'],
    maxLength: [50, 'Per ilgas slaptažodis'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = model('User', userSchema);

export default userModel;
