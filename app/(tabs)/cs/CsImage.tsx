import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
export default function CsImage({ src }: { src: string | StaticImport }) {
    return <Image alt="image" src={src} fill priority />;
}
