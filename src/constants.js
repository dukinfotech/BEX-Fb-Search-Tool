const constants = {
  categories: [
    {
      label: 'Bất kỳ',
      value: ''
    },
    {
      label: 'Doanh nghiệp hoặc địa điểm ở địa phương',
      value: '1006'
    },
    {
      label: 'Công ty, tổ chức hoặc học viện',
      value: '1013'
    },
    {
      label: 'Thương hiệu hoặc sản phẩm',
      value: '1009'
    },
    {
      label: 'Nghệ sĩ, ban nhạc hoặc người của công chúng',
      value: '1007,180164648685982'
    },
    {
      label: 'Giải trí',
      value: '1019'
    },
    {
      label: 'Hoạt động cộng đồng',
      value: '2612'
    }
  ],
  locations: [
    {
      city: 'An Giang',
      code: '108640515825480'
    },
    {
      city: 'Bà Rịa - Vũng Tàu',
      code: '110041405685472'
    },
    {
      city: 'Bắc Giang',
      code: '109167735769857'
    },
    {
      city: 'Bắc Kạn',
      code: '105641672801586'
    },
    {
      city: 'Bạc Liêu',
      code: '109740452377835'
    },
    {
      city: 'Bắc Ninh',
      code: '107983352568918'
    },
    {
      city: 'Bến Tre',
      code: '108169082548939'
    },
    {
      city: 'Bình Định',
      code: '113028395375044'
    },
    {
      city: 'Bình Dương',
      code: '105744996115527'
    },
    {
      city: 'Bình Phước',
      code: '109916112357708'
    },
    {
      city: 'Bình Thuận',
      code: '108747619148221'
    },
    {
      city: 'Cà Mau',
      code: '112531495426126'
    },
    {
      city: 'Cần Thơ',
      code: '111403155545903'
    },
    {
      city: 'Cao Bằng',
      code: '108162225878454'
    },
    {
      city: 'Đà Nẵng',
      code: '111711568847056'
    },
    {
      city: 'Đắk Lắk',
      code: '109659755724738'
    },
    {
      city: 'Đăk Nông',
      code: '108079539226566'
    },
    {
      city: 'Điện Biên',
      code: '108138999213669'
    },
    {
      city: 'Đồng Nai',
      code: '112089428815888'
    },
    {
      city: 'Đồng Tháp',
      code: '111877735498369'
    },
    {
      city: 'Gia Lai',
      code: '110191339006945'
    },
    {
      city: 'Hà Giang',
      code: '107446829285335'
    },
    {
      city: 'Hà Nam',
      code: '109812039042677'
    },
    {
      city: 'Hà Nội',
      code: '106388046062960'
    },
    {
      city: 'Hà Tĩnh',
      code: '108536245843925'
    },
    {
      city: 'Hải Dương',
      code: '103934556308311'
    },
    {
      city: 'Hải Phòng',
      code: '114668461883395'
    },
    {
      city: 'Hậu Giang',
      code: '112926482058580'
    },
    {
      city: 'Hồ Chí Minh',
      code: '108458769184495'
    },
    {
      city: 'Hòa Bình',
      code: '114392968570855'
    },
    {
      city: 'Hưng Yên',
      code: '110457042313059'
    },
    {
      city: 'Khánh Hòa',
      code: '109442775742673'
    },
    {
      city: 'Kiên Giang',
      code: '107128589319099'
    },
    {
      city: 'Kon Tum',
      code: '113173135363514'
    },
    {
      city: 'Lai Châu',
      code: '105479276152349'
    },
    {
      city: 'Lâm Đồng',
      code: '105006496203045'
    },
    {
      city: 'Lạng Sơn',
      code: '109497189069518'
    },
    {
      city: 'Lào Cai',
      code: '111628348854225'
    },
    {
      city: 'Long An',
      code: '112780328736488'
    },
    {
      city: 'Nam Định',
      code: '100243430017590'
    },
    {
      city: 'Nghệ An',
      code: '111615515528234'
    },
    {
      city: 'Ninh Bình',
      code: '110429408985819'
    },
    {
      city: 'Ninh Thuận',
      code: '104973222872461'
    },
    {
      city: 'Phú Thọ',
      code: '106530866047287'
    },
    {
      city: 'Phú Yên',
      code: '110791202275388'
    },
    {
      city: 'Quảng Bình',
      code: '111244068899165'
    },
    {
      city: 'Quảng Nam',
      code: '109477335744202'
    },
    {
      city: 'Quảng Ngãi',
      code: '110161112345635'
    },
    {
      city: 'Quảng Ninh',
      code: '109053269122518'
    },
    {
      city: 'Quảng Trị',
      code: '133571830058631'
    },
    {
      city: 'Sóc Trăng',
      code: '115334175145414'
    },
    {
      city: 'Sơn La',
      code: '104043839631933'
    },
    {
      city: 'Tây Ninh',
      code: '106279826069074'
    },
    {
      city: 'Thái Bình',
      code: '114183551925573'
    },
    {
      city: 'Thái Nguyên',
      code: '103998542969809'
    },
    {
      city: 'Thanh Hoá',
      code: '105667452800809'
    },
    {
      city: 'Thừa Thiên Huế',
      code: '107751605926185'
    },
    {
      city: 'Tiền Giang',
      code: '116332251714435'
    },
    {
      city: 'Trà Vinh',
      code: '105469112820027'
    },
    {
      city: 'Tuyên Quang',
      code: '113393768672172'
    },
    {
      city: 'Vĩnh Long',
      code: '110512632303092'
    },
    {
      city: 'Vĩnh Phúc',
      code: '113135802045540'
    },
    {
      city: 'Yên Bái',
      code: '109252215761161'
    }
  ]
};

export default constants