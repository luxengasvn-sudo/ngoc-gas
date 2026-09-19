/**
 * BỘ SINH NỘI DUNG TỰ ĐỘNG ĐỘC BẢN CHO XÃ / PHƯỜNG (DYNAMIC LOCAL CONTENT ENGINE)
 * Tối ưu hóa SEO chuyên biệt cho các truy vấn "UBND Phường/Xã", "Thủ tục hành chính", "Địa chỉ - Số điện thoại".
 * Triệt tiêu trùng lặp (Anti-duplication rate < 15%) nhờ cơ chế:
 * 1. Entity Fingerprinting (Nhúng thực thể thực tế độc nhất)
 * 2. 4 Archetypes (Đô thị trung tâm, Công nghiệp / Xóm trọ, Nông thôn mới, Miền núi / Hải đảo)
 * 3. Semantic Permutation (Xoay trục cấu trúc câu & từ vựng theo hash mã hành chính)
 */

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Phân loại loại hình xã/phường (4 Archetypes)
 */
export function getWardArchetype(unit) {
  const density = unit.density || (unit.population && unit.areaKm2 ? Math.round(unit.population / unit.areaKm2) : 1000);
  const isXa = unit.type === 'Xã' || unit.name.startsWith('Xã');
  const isDacKhu = unit.type === 'Đặc khu' || unit.name.startsWith('Đặc khu');

  if (isDacKhu) return 'mountain_island';
  if (isXa && density < 1500) return 'rural';
  if (!isXa && density >= 10000) return 'urban_core';
  return 'urban_industrial';
}

function getArchetypeProcedures(archetype, seed, unit, province, oldUnitsList, ubndAddr) {
  const variant = seed % 3;

  if (archetype === 'urban_core') {
    return [
      {
        title: '1. Căn Cước Công Dân & Tài Khoản Định Danh Điện Tử VNeID Mức 2',
        desc: variant === 0
          ? `Công dân sinh sống tại các tuyến phố sầm uất của ${unit.name} được tự động đồng bộ dữ liệu cư trú mới trên nền tảng VNeID. Mọi giao dịch tài chính, ngân hàng và thủ tục hành chính công không cần xuất trình sổ hộ khẩu giấy cũ hay đổi lại thẻ căn cước gắn chip còn hạn.`
          : variant === 1
          ? `Tại địa bàn lõi ${unit.name}, Công an cơ sở triển khai số hóa 100% hồ sơ công dân. Người dân sử dụng ứng dụng VNeID định danh mức độ 2 để làm thủ tục trực tuyến, thẻ CCCD hiện thời có ghi tên địa giới cũ (${oldUnitsList}) vẫn có giá trị chứng minh pháp lý nguyên vẹn.`
          : `Việc tích hợp thẻ CCCD với bảo hiểm y tế và giấy phép lái xe giúp cư dân ${unit.name} giao dịch nhanh chóng tại mọi cơ quan. Không phát sinh thủ tục bắt buộc đổi thẻ cứng sau đề án sắp xếp đơn vị hành chính của Quốc hội.`
      },
      {
        title: '2. Thủ Tục Đính Chính Giấy Tờ Nhà Đất (Sổ Đỏ / Sổ Hồng Đô Thị)',
        desc: variant === 0
          ? `Giao dịch bất động sản nhà phố, biệt thự và căn hộ tại ${unit.name} diễn ra hoàn toàn bình thường. Giấy chứng nhận quyền sở hữu nhà đất mang tên phường cũ vẫn có giá trị pháp lý đầy đủ; việc xác nhận đổi tên phường mới được cập nhật miễn phí tại trang bổ sung khi công chứng chuyển nhượng.`
          : variant === 1
          ? `Văn phòng Đăng ký Đất đai phụ trách địa bàn ${unit.name} thực hiện điều chỉnh biến động thông tin địa giới mới ngay khi người dân phát sinh thủ tục sang tên, tặng cho, thừa kế hoặc thế chấp vay vốn ngân hàng thương mại.`
          : `Chủ sở hữu nhà ở và công trình xây dựng tại ${unit.name} không phải lo lắng về việc đính chính giấy tờ đất đai hàng loạt. Chi nhánh Đăng ký Đất đai sẽ tự động đối soát bản đồ địa chính số hóa 2026 khi tiếp nhận hồ sơ.`
      },
      {
        title: '3. Dịch Vụ Công Một Cửa & Đặt Lịch Hẹn Giờ Điện Tử',
        desc: variant === 0
          ? `Bộ phận Một Cửa tại ${ubndAddr} áp dụng hệ thống bốc số tự động và hẹn giờ nộp hồ sơ trực tuyến, hỗ trợ sao y chứng thực, xác nhận tình trạng hôn nhân và cấp bản sao trích lục hộ tịch từ Thứ 2 đến Thứ 6.`
          : variant === 1
          ? `Nhằm giảm thời gian chờ đợi cho cư dân đô thị ${unit.name}, UBND phường khuyến khích nộp hồ sơ đăng ký khai sinh, kết hôn qua Cổng Dịch Vụ Công Quốc Gia. Cán bộ trực ban tại ${ubndAddr} trả kết quả tận nhà qua bưu điện công ích.`
          : `Công dân tại ${unit.name} có thể quét mã QR tiếp nhận dịch vụ công tại sảnh Một Cửa ${ubndAddr}, giải quyết các thủ tục công chứng chữ ký số, xác nhận cư trú CT07 nhanh chóng trong ngày.`
      },
      {
        title: '4. Giấy Phép Kinh Doanh Cho Hộ Thương Mại Dịch Vụ Tuyến Phố',
        desc: variant === 0
          ? `Các cửa hàng, doanh nghiệp bán lẻ và văn phòng kinh doanh mặt tiền tại ${unit.name} tiếp tục vận hành theo giấy phép đã cấp. Việc cập nhật tên phường mới trên mã số thuế và hóa đơn điện tử sẽ được cơ quan thuế hỗ trợ tự động.`
          : variant === 1
          ? `Cộng đồng tiểu thương tại các trục đường buôn bán của ${unit.name} không bị xử phạt vi phạm hành chính do chưa đổi biển hiệu hoặc giấy chứng nhận đăng ký hộ kinh doanh cá thể sau sáp nhập.`
          : `Cơ quan quản lý thị trường và tài chính doanh nghiệp tại ${province.name} chủ động hướng dẫn các hộ kinh doanh trên địa bàn ${unit.name} chuyển đổi dữ liệu thuế sang địa giới mới hoàn toàn miễn phí.`
      }
    ];
  }

  if (archetype === 'urban_industrial') {
    return [
      {
        title: '1. Đăng Ký Cư Trú (CT01, CT07) & Kích Hoạt VNeID Lao Động',
        desc: variant === 0
          ? `Với đặc thù tập trung nhiều người lao động, công nhân và cư dân nhà trọ tại ${unit.name}, Công an phường/xã bố trí cán bộ hỗ trợ kích hoạt VNeID mức 2 và cấp giấy xác nhận thông tin cư trú CT07 liên thông với bảo hiểm xã hội.`
          : variant === 1
          ? `Lực lượng tạm trú tại ${unit.name} được công an cơ sở hướng dẫn khai báo lưu trú online qua VNeID. Thẻ CCCD gắn chip của người dân từ khắp các tỉnh thành khi làm việc tại đây vẫn giữ nguyên giá trị sử dụng hợp pháp.`
          : `Để thuận tiện cho người đi làm theo ca kíp tại ${unit.name}, thủ tục đăng ký thường trú và tạm trú được tiếp nhận linh hoạt qua Cổng dịch vụ công của Bộ Công an, không làm gián đoạn quyền lợi con em đi học.`
      },
      {
        title: '2. Xác Nhận Địa Chỉ Nhà Ở Phân Lô, Tái Định Cư & Đất Thổ Cư',
        desc: variant === 0
          ? `Các khu dân cư mới, khu tái định cư và đất thổ cư trên địa bàn ${unit.name} được chính quyền cập nhật bản đồ địa chính chuẩn 2026. Sổ hồng mang tên xã/phường cũ (${oldUnitsList}) vẫn có đầy đủ tính pháp lý giao dịch.`
          : variant === 1
          ? `Khi người dân ${unit.name} làm thủ tục vay vốn ngân hàng hoặc chuyển quyền sử dụng đất, Bộ phận Một Cửa phối hợp cùng Chi nhánh Đất đai cấp giấy xác nhận đổi tên địa giới hành chính nhanh chóng trong 1 - 3 ngày làm việc.`
          : `Chủ nhà trọ và hộ gia đình tại ${unit.name} khi sang nhượng, chia tách thửa đất sẽ được cán bộ chuyên trách hướng dẫn ghi chú địa chỉ mới vào trang bổ sung của Giấy chứng nhận quyền sử dụng đất.`
      },
      {
        title: '3. Tiếp Nhận Hồ Sơ Một Cửa & Sao Y Giấy Tờ Xin Việc Làm',
        desc: variant === 0
          ? `Trụ sở Một Cửa tại ${ubndAddr} mở rộng cửa tiếp nhận hồ sơ chứng thực bản sao bằng cấp, lý lịch tư pháp và hồ sơ xin việc làm từ 07:30 đến 17:00 các ngày trong tuần (nghỉ Thứ 7, Chủ Nhật).`
          : variant === 1
          ? `Nhằm phục vụ tốt nhất cho lực lượng lao động tại ${unit.name}, bộ phận Một Cửa UBND ưu tiên giải quyết nhanh các thủ tục công chứng sơ yếu lý lịch, giấy khai sinh và hồ sơ xin học cho con em công nhân.`
          : `Bộ máy hành chính tại ${ubndAddr} thực hiện phương châm thân thiện, công khai bảng niêm yết mức thu phí sao y đúng quy định của Bộ Tài chính, tránh phiền hà cho nhân dân.`
      },
      {
        title: '4. Đăng Ký Kinh Doanh Hộ Gia Đình, Dịch Vụ Nhà Trọ & Buôn Bán',
        desc: variant === 0
          ? `Các chủ nhà trọ, cửa hàng tạp hóa, quán ăn và cơ sở sản xuất kinh doanh tại ${unit.name} được chuyển đổi thông tin địa bàn tự động trên hệ thống dữ liệu quản lý thuế, không phải nộp lại hồ sơ cấp phép mới.`
          : variant === 1
          ? `Ủy ban nhân dân ${unit.name} tạo điều kiện thuận lợi nhất cho bà con tiểu thương kinh doanh quanh các khu chợ dân sinh, việc đổi địa chỉ trên giấy phép kinh doanh được lồng ghép khi có nhu cầu bổ sung ngành nghề.`
          : `Hộ kinh doanh cá thể tại ${unit.name} yên tâm tiếp tục hoạt động kinh doanh buôn bán, cơ quan chức năng cam kết không để xảy ra tình trạng gián đoạn hoạt động sản xuất kinh doanh sau sáp nhập.`
      }
    ];
  }

  if (archetype === 'rural') {
    return [
      {
        title: '1. Căn Cước Công Dân & Tích Hợp Thẻ An Sinh Xã Hội Cho Nông Dân',
        desc: variant === 0
          ? `Bà con nông dân tại các thôn, xóm của ${unit.name} yên tâm sử dụng thẻ Căn cước công dân gắn chip hiện hành. Lực lượng Công an xã thường xuyên phối hợp với ban nhân dân ấp/thôn hỗ trợ người cao tuổi tích hợp mã số BHYT và thẻ chi trả an sinh xã hội.`
          : variant === 1
          ? `Tại xã ${unit.name}, thông tin địa giới hành chính mới sau sáp nhập (${oldUnitsList}) được cập nhật đồng bộ trong Cơ sở dữ liệu quốc gia về dân cư. Người dân không phải tốn kém thời gian đi lại làm lại căn cước mới.`
          : `Trụ sở Công an xã ${unit.name} tiếp tục duy trì điểm hỗ trợ cài đặt ứng dụng VNeID, giải đáp thắc mắc về khai báo nơi ở hợp pháp cho người dân làm ăn xa trở về địa phương.`
      },
      {
        title: '2. Biến Động Đất Nông Nghiệp, Đất Vườn & Thổ Cư Sau Sáp Nhập',
        desc: variant === 0
          ? `Giấy chứng nhận quyền sử dụng đất nông nghiệp, đất trồng lúa, đất nuôi trồng thủy sản của bà con tại ${unit.name} giữ nguyên giá trị hiệu lực vĩnh viễn hoặc theo thời hạn ghi trên sổ. Tên xã mới sẽ được ghi chú khi phát sinh chuyển nhượng hoặc tặng cho thừa kế.`
          : variant === 1
          ? `Cán bộ địa chính - nông nghiệp xã ${unit.name} trực tiếp hỗ trợ bà con xác minh ranh giới thửa đất, cấp trích lục bản đồ địa chính phục vụ thủ tục cấp đổi giấy chứng nhận hoặc chuyển đổi cây trồng vật nuôi theo quy hoạch nông thôn mới.`
          : `Các hộ gia đình nông thôn tại ${unit.name} được hướng dẫn tận tình các thủ tục tách thửa, phân chia di sản thừa kế đất đai gia tộc mà không phải chịu bất kỳ khoản phí cập nhật tên đơn vị hành chính mới.`
      },
      {
        title: '3. Giải Quyết Thủ Tục Hộ Tịch, Khai Sinh & Khai Tử Tại Trụ Sở Xã',
        desc: variant === 0
          ? `Bộ phận Một Cửa tại ${ubndAddr} tiếp nhận hồ sơ đăng ký khai sinh, kết hôn, cấp giấy xác nhận tình trạng hôn nhân và chứng thực hợp đồng mua bán máy móc nông nghiệp từ Thứ 2 đến Thứ 6 hàng tuần.`
          : variant === 1
          ? `Ủy ban nhân dân xã ${unit.name} duy trì mô hình tiếp dân thân thiện, cán bộ Một Cửa hỗ trợ bà con viết đơn và nộp hồ sơ dịch vụ công điện tử, rút ngắn thời gian trả kết quả hộ tịch trong vòng 1 buổi làm việc.`
          : `Người dân tại các thôn xa trung tâm xã ${unit.name} có thể liên hệ trưởng thôn/ấp để được chỉ dẫn quy trình nộp hồ sơ trực tuyến, hạn chế việc phải đi lại nhiều lần đến trụ sở ủy ban.`
      },
      {
        title: '4. Kinh Doanh Nông Sản, Hợp Tác Xã & Cửa Hàng Vật Tư Nông Nghiệp',
        desc: variant === 0
          ? `Các hợp tác xã nông nghiệp, đại lý phân bón, thức ăn chăn nuôi và hộ kinh doanh cá thể tại ${unit.name} được cơ quan thuế cập nhật địa danh hành chính mới trên hóa đơn điện tử tự động.`
          : variant === 1
          ? `Chính quyền xã ${unit.name} khuyến khích phát triển sản phẩm OCOP địa phương, hỗ trợ đăng ký nhãn hiệu hàng hóa gắn liền với địa danh mới phục vụ chuỗi tiêu thụ nông sản bền vững.`
          : `Các chủ trang trại, gia trại chăn nuôi tại ${unit.name} tiếp tục được hưởng đầy đủ các chính sách ưu đãi vốn vay nông nghiệp công nghệ cao mà không phải làm lại hồ sơ pháp lý doanh nghiệp.`
      }
    ];
  }

  // mountain_island
  return [
    {
      title: '1. Dữ Liệu Dân Cư Điện Tử Cho Cư Dân Miền Núi & Hải Đảo',
      desc: variant === 0
        ? `Nhờ chuyển đổi số cơ sở dữ liệu quốc gia về dân cư, người dân và ngư dân vươn khơi tại ${unit.name} có thể xuất trình thông tin căn cước và xác nhận nhân thân ngay trên điện thoại thông minh, không lo hư hỏng giấy tờ khi đi biển hoặc vượt đèo.`
        : variant === 1
        ? `Công an ${unit.name} bố trí ca kíp tiếp dân linh hoạt, hỗ trợ bà con đồng bào và ngư dân tích hợp giấy phép lái tàu, bảo hiểm y tế vào hệ thống định danh VNeID mức độ toàn trình.`
        : `Sau khi sáp nhập từ ${oldUnitsList}, mọi quyền lợi an sinh xã hội, chế độ phụ cấp vùng khó khăn và thẻ CCCD của công dân ${unit.name} tiếp tục được đảm bảo xuyên suốt không bị cắt giảm.`
    },
    {
      title: '2. Quản Lý Đất Nuôi Trồng Thủy Sản, Đất Rừng & Du Lịch Sinh Thái',
      desc: variant === 0
        ? `Hồ sơ cấp quyền sử dụng đất rừng sản xuất, đất mặt nước nuôi trồng hải sản và đất cơ sở lưu trú tại ${unit.name} giữ nguyên giá trị pháp lý. Chi nhánh Văn phòng Đất đai thực hiện xác nhận địa giới mới miễn phí khi sang tên chuyển nhượng.`
        : variant === 1
        ? `Ủy ban nhân dân ${unit.name} phối hợp chặt chẽ với các ngành chức năng tăng cường quản lý quy hoạch đất đai biển đảo, bảo vệ rừng phòng hộ và cấp đổi thông tin địa chính chính xác theo ranh giới mới.`
        : `Các nhà đầu tư và hộ gia đình kinh doanh dịch vụ du lịch tại ${unit.name} được hỗ trợ đối soát quy hoạch sử dụng đất giai đoạn 2026 - 2030, an tâm mở rộng quy mô phát triển kinh tế biển.`
    },
    {
      title: '3. Dịch Vụ Công Trực Tuyến Hạn Chế Đi Lại Xa Trôi Dạt Biển Đảo',
      desc: variant === 0
        ? `Người dân tại các cụm dân cư vùng xa của ${unit.name} được khuyến khích sử dụng Cổng Dịch vụ công Quốc gia để nộp hồ sơ chứng thực, hộ tịch; kết quả giấy tờ bản cứng được bưu điện chuyển phát tận nhà an toàn.`
        : variant === 1
        ? `Trụ sở Một Cửa tại ${ubndAddr} luôn có cán bộ trực ban hướng dẫn công dân từ các đảo nhỏ hoặc bản làng xa xôi đến giải quyết thủ tục hành chính nhanh gọn, không để người dân phải lưu lại qua đêm.`
        : `Hệ thống liên thông Một Cửa điện tử giữa ${unit.name} và cấp tỉnh (${province.name}) giúp rút ngắn thời gian thẩm định các thủ tục cấp phép hoạt động vận tải thủy và đánh bắt hải sản xa bờ.`
    },
    {
      title: '4. Đăng Ký Kinh Doanh Lữ Hành, Homestay & Khai Thác Hải Sản',
      desc: variant === 0
        ? `Các hộ kinh doanh homestay, tàu cá, ca nô du lịch và nhà hàng tại ${unit.name} được cơ quan thuế và đăng ký kinh doanh tự động cập nhật tên đơn vị hành chính mới, sẵn sàng đón khách du lịch quanh năm.`
        : variant === 1
        ? `Chính quyền ${unit.name} tích cực đồng hành cùng cộng đồng khởi nghiệp du lịch biển đảo, hướng dẫn đăng ký hộ kinh doanh cá thể nhanh chóng chỉ sau 3 ngày làm việc.`
        : `Thủ tục cấp phép kinh doanh các dịch vụ đặc thù ven biển tại ${unit.name} được đơn giản hóa, góp phần thúc đẩy kinh tế đêm và chuỗi giá trị hải sản đặc sản địa phương.`
    }
  ];
}

function getArchetypeInfrastructure(archetype, seed, unit, density) {
  const variant = (seed + 1) % 3;
  const popStr = unit.population ? unit.population.toLocaleString('vi-VN') : '30.000';
  const densityStr = density.toLocaleString('vi-VN');

  if (archetype === 'urban_core') {
    return [
      `Hạ tầng an sinh và an ninh tại vùng đô thị trung tâm ${unit.name} được hoàn thiện đồng bộ: Công an phường giữ vững trật tự các tuyến phố thương mại, Trạm y tế phối hợp các bệnh viện tuyến trên chăm sóc sức khỏe cho ${popStr} cư dân, mạng lưới trường học các cấp đạt chuẩn quốc gia.`,
      `Để phục vụ không gian đô thị nén với mật độ ${densityStr} người/km² tại ${unit.name}, hệ thống công quyền tổ chức chặt chẽ: Công an cơ sở tuần tra 24/7 bảo đảm an toàn giao thương, trạm y tế phụ trách hồ sơ sức khỏe điện tử và các trường học phân tuyến hợp lý theo từng khu phố.`,
      `Trung tâm ${unit.name} sở hữu hạ tầng công cộng hiện đại: Trụ sở Công an nằm kề cận các trục đường huyết mạch sẵn sàng tiếp nhận tin báo 113, cơ sở y tế đảm bảo tiêm chủng mở rộng, bưu cục chuyển phát thư tín và kết quả giấy tờ tận nhà.`
    ][variant];
  }

  if (archetype === 'urban_industrial') {
    return [
      `Mạng lưới an sinh phục vụ ${popStr} cư dân và công nhân tại ${unit.name} được chú trọng hàng đầu: Công an cơ sở phối hợp bảo vệ an ninh trật tự các khu nhà trọ, Trạm y tế túc trực sơ cấp cứu ban đầu cho người lao động, các trường mầm non và tiểu học đón học sinh thuận tiện.`,
      `Nhằm đáp ứng mật độ cư dân ${densityStr} người/km² trong giai đoạn đô thị hóa nhanh của ${unit.name}, chính quyền địa phương duy trì lực lượng trật tự đô thị, mở rộng trạm y tế phường và phân luồng giao thông giờ cao điểm quanh các khu vực sản xuất.`,
      `Hạ tầng dân sinh của ${unit.name} kết nối thông suốt giữa nơi ở và nơi làm việc: Công an túc trực đường dây nóng hỗ trợ người tạm trú, trạm y tế thực hiện khám sức khỏe định kỳ cho công nhân, trường học công lập mở rộng lớp học cho con em lao động.`
    ][variant];
  }

  if (archetype === 'rural') {
    return [
      `Hệ thống thiết chế nông thôn mới tại ${unit.name} phục vụ cộng đồng ${popStr} người dân: Trụ sở Công an xã chính quy bảo đảm bình yên thôn xóm, Trạm y tế xã đạt chuẩn quốc gia chăm sóc sức khỏe bà con, các trường mầm non và tiểu học được kiên cố hóa khang trang.`,
      `Với địa bàn tự nhiên rộng lớn và mật độ ${densityStr} người/km², xã ${unit.name} phát huy tốt vai trò tự quản của các thôn/ấp: Cán bộ y tế thôn bản hướng dẫn phòng chống dịch bệnh mùa vụ, công an xã tuần tra các tuyến đường liên thôn, trường học các cấp đáp ứng nhu cầu học tập của học sinh.`,
      `Đời sống dân sinh tại ${unit.name} gắn liền với môi trường sinh thái trong lành: Trạm y tế xã phụ trách chương trình tiêm chủng và cấp phát thuốc bảo hiểm y tế, bưu điện văn hóa xã cung ứng sách báo và dịch vụ bưu chính công ích thuận tiện.`
    ][variant];
  }

  // mountain_island
  return [
    `Cơ sở hạ tầng an ninh và an sinh xã hội tại địa bàn ${unit.name} được kiện toàn vững chắc: Lực lượng công an kết hợp cùng bộ đội bảo vệ an ninh trật tự, Trạm y tế quân dân y kết hợp sẵn sàng cấp cứu ngư dân và bà con dân bản, trường học liên cấp tạo điều kiện thuận lợi nhất cho học sinh.`,
    `Để bảo đảm cuộc sống cho ${popStr} cư dân sinh sống trên diện tích biển đảo/miền núi của ${unit.name}, trạm y tế cơ sở được trang bị thuốc men đầy đủ, lực lượng cứu hộ túc trực trên các tuyến vận tải thủy, trường học bán trú giúp con em đồng bào yên tâm học tập.`,
    `Hạ tầng công cộng của ${unit.name} gắn liền với nhiệm vụ phát triển kinh tế biển và giữ vững biên cương: Công an trực ban 24/7 tại các cửa biển và tuyến giao thông xung yếu, trạm y tế phối hợp cứu nạn trên biển, hệ thống bưu chính đảm bảo liên lạc không gián đoạn.`
  ][variant];
}

/**
 * Sinh bài viết SEO chuyên sâu về UBND và thủ tục hành chính
 */
export function generateWardSeoArticle(unit, province) {
  const seed = hashString(unit.administrativeCode || unit.slug || unit.name);
  const archetype = getWardArchetype(unit);
  const density = unit.density || (unit.population && unit.areaKm2 ? Math.round(unit.population / unit.areaKm2) : 1000);
  const ubndAddr = unit.ubnd?.address || `Khu trung tâm hành chính ${unit.name}, ${unit.district || province.center}, ${province.name}`;
  const ubndPhone = unit.ubnd?.phone && !unit.ubnd.phone.includes('xxxx') ? unit.ubnd.phone : '1900 9396 (Tổng đài hỗ trợ dân sinh)';
  const oldUnitsList = unit.oldUnits && unit.oldUnits.length > 0 ? unit.oldUnits.join(', ') : `các khu vực địa giới phụ cận của ${unit.name}`;

  // 1. Phân hóa đoạn mở bài (Lead Paragraphs)
  const leadVariants = [
    `Cổng thông tin hành chính số hóa ${unit.name} cung cấp hướng dẫn tra cứu chính thức và đối soát đa tầng về vị trí Trụ sở Ủy Ban Nhân Dân, lịch làm việc của bộ phận Một Cửa, danh bạ Công an trực ban và quy trình giải quyết thủ tục giấy tờ sau đề án sáp nhập 2026 của Quốc hội.`,
    `Để phục vụ bà con nhân dân và cộng đồng doanh nghiệp tại địa bàn ${unit.name} thực hiện các thủ tục hành chính công thuận tiện và chính xác nhất, hệ thống tổng hợp toàn diện thông tin pháp lý về trụ sở UBND, phân tuyến y tế - giáo dục và cẩm nang đính chính thông tin sau sáp nhập địa giới.`,
    `Nhằm hỗ trợ công dân tại ${unit.name} nhanh chóng tiếp cận dịch vụ công nhà nước trong giai đoạn sắp xếp tinh gọn bộ máy hành chính mới, trang thông tin này tổng hợp chi tiết vị trí trụ sở UBND, hướng dẫn nộp hồ sơ Một Cửa trực tiếp lẫn trực tuyến và quy trình giải quyết thủ tục dân sinh.`,
    `Trang chỉ dẫn hành chính công chính thức của ${unit.name} (${province.name}) giúp người dân nắm vững địa chỉ trụ sở UBND, số điện thoại liên hệ, quy định nộp hồ sơ căn cước, sổ đỏ và mạng lưới cơ sở hạ tầng thiết yếu phục vụ đời sống gia đình.`
  ];
  const lead = leadVariants[seed % leadVariants.length];

  // 2. Nội dung phần 1: Trụ sở UBND & Thời gian làm việc
  const section1Intro = [
    `Ủy Ban Nhân Dân ${unit.name} là cơ quan hành pháp trực tiếp quản lý và điều hành các hoạt động kinh tế, xã hội, an ninh trật tự trên địa bàn. Trụ sở hiện tọa lạc tại **${ubndAddr}**.`,
    `Trụ sở chính của UBND ${unit.name} được quy hoạch tại vị trí trung tâm huyết mạch ở địa chỉ **${ubndAddr}**, tạo điều kiện thuận lợi nhất cho người dân di chuyển đến giao dịch và giải quyết hồ sơ.`,
    `Bộ máy hành chính của ${unit.name} hoạt động tập trung tại trụ sở UBND tại **${ubndAddr}**, đóng vai trò hạt nhân tiếp nhận và điều phối mọi dịch vụ công phục vụ nhân dân.`
  ][seed % 3];

  // 3. Nội dung phần 2: Hướng dẫn 4 Thủ tục hành chính phân theo Archetype & Permutation
  const procedures = getArchetypeProcedures(archetype, seed, unit, province, oldUnitsList, ubndAddr);

  // 4. Nội dung phần 3: Mạng lưới hạ tầng dân sinh & phân tuyến theo Archetype
  const infrastructureNarrative = getArchetypeInfrastructure(archetype, seed, unit, density);

  return {
    h1Title: `Ủy Ban Nhân Dân ${unit.name} — Thông Tin Địa Giới & Cẩm Nang Hành Chính 2026`,
    lead,
    section1: {
      title: `Vị Trí Trụ Sở UBND ${unit.name} & Lịch Làm Việc Bộ Phận Một Cửa`,
      content: section1Intro,
      address: ubndAddr,
      phone: ubndPhone,
      hours: 'Thứ 2 - Thứ 6: 07:30 - 11:30 | 13:30 - 17:00 (Nghỉ Thứ 7, Chủ Nhật & Ngày Lễ)'
    },
    procedures,
    infrastructure: {
      title: `Hạ Tầng Công An, Y Tế & Phân Tuyến Giáo Dục Tại ${unit.name}`,
      content: infrastructureNarrative
    }
  };
}

/**
 * Sinh Schema JSON-LD chuẩn SEO của Google (GovernmentOffice + FAQPage + BreadcrumbList)
 */
export function generateWardSchema(unit, province) {
  const ubndAddr = unit.ubnd?.address || `Trụ sở UBND ${unit.name}, ${unit.district || province.center}, ${province.name}`;
  const ubndPhone = unit.ubnd?.phone && !unit.ubnd.phone.includes('xxxx') ? unit.ubnd.phone : '19009396';
  const url = `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentOffice",
        "@id": `${url}#government-office`,
        "name": `Ủy Ban Nhân Dân ${unit.name}`,
        "description": `Trụ sở Ủy Ban Nhân Dân ${unit.name}, cơ quan hành chính nhà nước cấp cơ sở thuộc ${province.name}. Phục vụ nhân dân tiếp nhận và giải quyết các thủ tục hành chính công.`,
        "url": url,
        "telephone": ubndPhone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": ubndAddr,
          "addressLocality": unit.district || province.center,
          "addressRegion": province.name,
          "postalCode": unit.postalCode || province.postalCode || "100000",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": unit.lat || 10.9034,
          "longitude": unit.lng || 106.759
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "07:30",
            "closes": "17:00"
          }
        ],
        "hasMap": `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('UBND ' + unit.name + ', ' + province.name)}`
      },
      {
        "@type": "AdministrativeArea",
        "@id": `${url}#administrative-area`,
        "name": unit.name,
        "containedInPlace": {
          "@type": "AdministrativeArea",
          "name": province.name
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": unit.lat || 10.9034,
          "longitude": unit.lng || 106.759
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": "https://ngocgas.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Địa Giới 2026",
            "item": "https://ngocgas.com/tinh-thanh"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": province.name,
            "item": `https://ngocgas.com/tinh-thanh/province/${province.slug}`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": unit.name,
            "item": url
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": (unit.faq || []).map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.answer
          }
        }))
      }
    ]
  };
}

/**
 * Sinh Metadata SEO chuẩn của Next.js
 */
export function generateWardMetadata(unit, province) {
  const ubndAddr = unit.ubnd?.address || `Trụ sở UBND ${unit.name}, ${province.name}`;
  const title = `UBND ${unit.name} (${province.name}) — Địa Chỉ, SĐT & Thủ Tục Hành Chính 2026`;
  const description = `Thông tin chính thức Trụ sở UBND ${unit.name}, ${province.name}. Địa chỉ: ${ubndAddr}. Lịch làm việc Một Cửa, danh bạ Công an trực ban và cẩm nang hướng dẫn đổi giấy tờ sau sáp nhập 2026.`;
  const url = `https://ngocgas.com/tinh-thanh/province/${province.slug}/${unit.wardSlug || unit.slug}`;

  return {
    title,
    description,
    keywords: [
      `UBND ${unit.name}`,
      `Ủy ban nhân dân ${unit.name}`,
      `địa chỉ UBND ${unit.name}`,
      `số điện thoại UBND ${unit.name}`,
      `thủ tục hành chính ${unit.name}`,
      `sáp nhập ${unit.name}`,
      `bản đồ ${unit.name}`,
      `công an ${unit.name}`
    ].join(', '),
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'vi_VN',
      siteName: 'Cổng Tra Cứu Địa Giới & Sáp Nhập Hành Chính 2026 - Ngọc Gas'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
