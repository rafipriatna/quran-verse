'use client'
import React, { useState } from "react";
import { Card, CardFooter, Image, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { surah } from "quran-pack"
import { title, subtitle } from "@/components/primitives";
import { Emotions } from "@/config/emotions";

import ayat from "@/data/ayat.json";
import { SurahVerse, SurahVerses } from "quran-pack/dist/surah/types";

interface DataAyat {
  namaSurat: string;
  namaSuratID: string;
  contents: {
    arabic: string;
    latin: string;
    translated: string;
    ayat: string;
  }
}

interface MergeData {
  [key: string]: string;
}

type EmotionType = 'MARAH' | 'SENANG' | 'SEDIH' | 'CEMAS' | 'KESEPIAN' | 'BERSYUKUR';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [emotionType, setEmotionType] = useState<EmotionType | null>(null);
  const [dataAyat, setDataAyat] = useState<DataAyat | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<number>(0)

  const getRandomItem = (key: EmotionType) => {
    if (ayat[key]) {
      setEmotionType(key);
      const selectedArray = ayat[key];

      setSelectedNumber(getUniqueRandomIndex(selectedArray.length, selectedNumber));

      const randomElement = selectedArray[selectedNumber];
      const quran = surah(randomElement.surat);
      let surat: SurahVerse | SurahVerses;

      if (randomElement.ayat_2 == 0) {
        surat = quran.getVerse(randomElement.ayat);

        setDataAyat({
          namaSurat: quran.nameID,
          namaSuratID: quran.nameTranslateID,
          contents: {
            arabic: surat.arabic.toString(),
            latin: surat.latin.toString(),
            translated: surat.translation.id.replace(/\d+\)/g, ''),
            ayat: randomElement.ayat.toString()
          }
        })

      } else {
        surat = quran.getVerses(randomElement.ayat, randomElement.ayat_2);

        setDataAyat({
          namaSurat: quran.nameID,
          namaSuratID: quran.nameTranslateID,
          contents: {
            arabic: Object.values(mergeValues(surat.arabics, randomElement.ayat.toString(), randomElement.ayat_2.toString())).toString(),
            latin: Object.values(mergeValues(surat.latins, randomElement.ayat.toString(), randomElement.ayat_2.toString())).join(' '),
            translated: Object.values(mergeValues(surat.translations.id, randomElement.ayat.toString(), randomElement.ayat_2.toString())).join(' ').replace(/\d+\)/g, ''),
            ayat: randomElement.ayat.toString() + ' - ' + randomElement.ayat_2.toString()
          }
        })
      }

      onOpen();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedNumber(0);
      onOpenChange();
    }
    setIsModalOpen(open);
  };

  function getUniqueRandomIndex(length: number, exclude: number | null): number {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * length);
    } while (randomIndex === exclude);
    return randomIndex;
  };

  function mergeValues(isi: object, start: string, end: string) {
    return Object.entries(isi).filter(([key]) => key >= start && key <= end).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as MergeData)
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4">
        <div className="inline-block max-w-3xl text-center justify-center">
          <h1 className={title()}>Sebuah pesan dari&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Al-Qur'an&nbsp;</h1>
          <h1 className={title()}>🕋&nbsp;</h1>
          <br />
          <h1 className={title()}>
            untuk setiap manusia.
          </h1>
          <h2 className={subtitle({ class: "my-10" })}>
            "Bulan Ramadhan, bulan yang di dalamnya diturunkan Al-Qur'an sebagai petunjuk, bagi manusia dan penjelasan-penjelasan mengenai petunjuk itu serta pembeda antara yang hak dengan yangn batil." (QS. Al-Baqarah: 185)
          </h2>
        </div>

        <div className="inline-block text-center text-xl font-bold mb-5">
          <h3>Bagaimana perasaanmu hari ini?</h3>
        </div>

        <div className="flex gap-5 lg:flex-row flex-col flex-wrap justify-center">
          {Emotions.lists.map((emotion, key) => (
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none"
              key={key}
            >
              <Image
                className="object-cover w-[350px] lg:w-[300px]"
                height={200}
                src={emotion.image}
              />
              <CardFooter className="justify-between before:bg-white/20 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{emotion.name}</p>
                <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm" onPress={() => { getRandomItem(emotion.name as EmotionType); setIsModalOpen(true) }}>
                  Buka
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section >

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={handleOpenChange} placement="bottom-center"
        scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{`QS. ${dataAyat?.namaSurat} (${dataAyat?.namaSuratID}): ${dataAyat?.contents.ayat}`}</ModalHeader>
              <ModalBody>
                {dataAyat && (
                  <>
                    <p className="font-serif font-semibold" dir="rtl">
                      {dataAyat.contents.arabic}
                    </p>
                    <p className="font-serif text-sm">
                      {dataAyat.contents.latin}
                    </p>
                    <p className="text-sm">
                      {dataAyat.contents.translated}
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button color="primary" variant="shadow" onPress={() => { getRandomItem(emotionType as EmotionType); setIsModalOpen(false) }}>
                  Lainnya
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
