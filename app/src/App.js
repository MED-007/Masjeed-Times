import { useEffect, useState } from "react";
import Prayer from "./components/Prayers";

function App() {
  const [selectedCityId, setSelectedCityId] = useState("Zagora");
  const [prayerTimes, setPrayerTimes] = useState({});

  const cities = [
    { name: "زاكورة", value: "Zagora" },
    { name: "ورزازات", value: "Ouarzazate" },
    { name: "الدار البيضاء", value: "Casablanca" },
    { name: "طنجة", value: "Tangier" },
    { name: "فاس", value: "Fez" },
    { name: "مراكش", value: "Marrakesh" },
    { name: "سلا", value: "Salé" },
    { name: "مكناس", value: "Meknes" },
    { name: "الرباط", value: "Rabat" },
    { name: "القنيطرة", value: "Kénitra" },
    { name: "وجدة", value: "Oujda" },
    { name: "أكادير", value: "Agadir" },
    { name: "تطوان", value: "Tetouan" },
    { name: "تمارة", value: "Temara" },
    { name: "آسفي", value: "Safi" },
    { name: "العيون", value: "Laayoune" },
    { name: "محمّدية", value: "Mohammedia" },
    { name: "خريبكة", value: "Khouribga" },
    { name: "الجديدة", value: "El Jadida" },
    { name: "بني ملال", value: "Beni Mellal" },
    { name: "إنزكان", value: "Aït Melloul" },
    { name: "الناظور", value: "Nador" },
    { name: "تازة", value: "Taza" },
    { name: "سطات", value: "Settat" },
    { name: "برشيد", value: "Berrechid" },
    { name: "خميسات", value: "Khemisset" },
    { name: "العرائش", value: "Larache" },
    { name: "كلميم", value: "Guelmim" },
    { name: "خنيفرة", value: "Khenifra" },
    { name: "بركان", value: "Berkane" },
    { name: "تاوريرت", value: "Taourirt" },
    { name: "بوسكورة", value: "Bouskoura" },
    { name: "الفقيه بن صالح", value: "Fquih Ben Salah" },
    { name: "واد زم", value: "Oued Zem" },
    { name: "قلعة السراغنة", value: "El Kelaa Des Sraghna" },
    { name: "سيدي سليمان", value: "Sidi Slimane" },
    { name: "الرشيدية", value: "Errachidia" },
    { name: "جرسيف", value: "Guercif" },
    { name: "أولاد تايمة", value: "Oulad Teima" },
    { name: "بن جرير", value: "Ben Guerir" },
    { name: "تيفلت", value: "Tifelt" },
    { name: "تارودانت", value: "Taroudant" },
    { name: "صفرو", value: "Sefrou" },
    { name: "الصويرة", value: "Essaouira" },
    { name: "الفنيدق", value: "Fnideq" },
    { name: "سيدي قاسم", value: "Sidi Kacem" },
    { name: "تزنيت", value: "Tiznit" },
    { name: "طانطان", value: "TanTan" },
    { name: "اليوسفية", value: "Youssoufia" },
    { name: "الصخيرات", value: "Skhirat" }
  ];

  useEffect(() => {
    if (!selectedCityId) return;

    const fetchPrayerTimes = async () => {
      try {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${formattedDate}?city=${selectedCityId}&country=MA`
        );

        const data_Prayer = await response.json();
        setPrayerTimes(data_Prayer);
        console.log(data_Prayer);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCityId]);

  return (
    <section>
      <div className="container">
        <div className="top-section">
          <div className="city">
            <h3>المدينة</h3>
            <select onChange={(e) => setSelectedCityId(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="date">
            <h3>التاريخ</h3>
            <h4>{new Date().toLocaleDateString('fr-MA')}</h4>
          </div>
        </div>

        <Prayer name={"الفجر"} time={prayerTimes.data?.timings?.Fajr} />
        <Prayer name={"الظهر"} time={prayerTimes.data?.timings?.Dhuhr} />
        <Prayer name={"العصر"} time={prayerTimes.data?.timings?.Asr} />
        <Prayer name={"المغرب"} time={prayerTimes.data?.timings?.Maghrib} />
        <Prayer name={"العشاء"} time={prayerTimes.data?.timings?.Isha} />
      </div>
    </section>
  );
}

export default App;
