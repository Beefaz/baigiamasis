import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    role: {
      type: String,
      default: "user",
      enum: [
        "user",
        "admin",
      ]
    },
    email: {
      type: String,
      required: [true, 'Pašto adresas - privalomas'],
      unique: [true, 'Toks pašto adresas jau užimtas'],
      minLength: [8, 'Per trumpas el. pašto adresas'],
      maxLength: [50, 'Per ilgas el. pašto adresas'],
      validate: [
        {
          validator: async function(email) {
            const user = await this.constructor.findOne({ email });
            return !user;
          },
          message: () => 'Toks pašto adresas jau yra panaudotas.'
        },
        {
          validator: (email) => /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(email),
          message: () => 'Netinkamas pašto adreso formatas',
        },
      ],
    },
    password: {
      type: String,
      validate: {
        validator: (password) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(password),
        message: () => 'Slaptažodis privalo turėti specialų simbolį, didžiąją raidę ir skaičių',
      },
      required: [true, 'Slaptažodis yra privalomas'],
      minLength: [8, 'Per trumpas slaptažodis'],
      maxLength: [50, 'Per ilgas slaptažodis'],
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
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {capped: true, max: 2}
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});

export default model('User', userSchema);
