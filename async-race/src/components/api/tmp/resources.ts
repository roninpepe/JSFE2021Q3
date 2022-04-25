import Settings from '../../const/settings';

const settings: Settings = new Settings();

class Resources {
  garage = `${settings.SERVER}garage`;

  engine = `${settings.SERVER}engine`;

  winners = `${settings.SERVER}winners`;
}

export default Resources;
