//timeSeries class

export class temperatureTS {
    public temperature : t[];
  }
  export class t {
    public ts: any;
    public value: string;
  }

  export class humidityTS {
    public humidity : h[];
  }
  export class h {
    public ts: any;
    public value: string;
  }

  export class presenceTS {
    public humidity : p[];
  }
  export class p {
    public ts: any;
    public value: string;
  }

  export class onoffTS {
    public onoff : o[];
  }
  export class o {
    public ts: any;
    public value: string;
  }
  export class powerp1TS {
    public powerp1 : pwr1[];
  }
  export class pwr1 {
    public ts: any;
    public value: string;
  }
  export class powerp2TS {
    public powerp1 : pwr2[];
  }
  export class pwr2 {
    public ts: any;
    public value: string;
  }
  export class powerp3TS {
    public powerp1 : pwr3[];
  }
  export class pwr3 {
    public ts: any;
    public value: string;
  }

  export class pwrLastRead {
    public onoff : onoff[];
    public powerp1 : powerp1[];
    public powerp2 : powerp2[];
    public powerp3: powerp3[];
  }
  export class onoff {
    public ts: any;
    public value: string;
  }
  export class powerp1 {
    public ts: any;
    public value: string;
  }
  export class powerp2 {
    public ts: any;
    public value: string;
  }
  export class powerp3 {
    public ts: any;
    public value: string;
  }

  export class tempLastRead {
    public temperature : humidity[];
    public humidity : presence[];
    public presence : temperature[];
  }
  export class humidity {
    public ts: any;
    public value: string;
  }
  export class presence {
    public ts: any;
    public value: string;
  }
  export class temperature {
    public ts: any;
    public value: string;
  }