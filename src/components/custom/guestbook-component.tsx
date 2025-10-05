import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const GuestBookComponent = () => {
    const guestMessages = [
        "Selamat Pengantin Baru! Semoga bahagia hingga ke Jannah 💍",
        "Tahniah! Semoga cinta kekal selamanya ❤️",
        "Semoga diberkati dengan ketenangan dan kasih sayang yang berkekalan.",
        "Doa kami agar perkahwinan ini penuh rahmat dan kebahagiaan.",
        "Tahniah kepada pasangan! Moga dilimpahi rezeki dan keberkatan.",
        "Selamat menempuh hidup baru bersama pasangan tercinta!",
        "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
        "Perjalanan baru bermula, semoga sentiasa dalam lindungan Allah.",
        "Moga cinta ini terus subur dalam setiap langkah kehidupan bersama.",
        "Tahniah! Moga diberi kesabaran dan pengertian dalam perkahwinan.",
        "Semoga setiap hari membawa lebih banyak cinta dan kebahagiaan.",
        "Doa tulus buat kalian berdua, semoga bahagia dunia akhirat.",
        "Moga ikatan ini menjadi asbab ke syurga buat kalian berdua.",
        "Tahniah! Moga rumah tangga penuh dengan kasih dan rahmah.",
        "Selamat pengantin baru, semoga dikurniakan zuriat yang soleh dan solehah.",
        "Perkahwinan ini permulaan kisah cinta abadi, tahniah sahabat! 💖",
    ];

    return (
        <div className="m-3">
            <h1 className="text-center text-2xl font-semibold mb-4">Guest Book</h1>

            <div className="h-80 overflow-y-auto border rounded-2xl p-4 bg-gradient-to-b from-white to-pink-50 shadow-inner">
                <ul className="space-y-3">
                    {guestMessages.map((message, index) => (
                        <li
                            key={index}
                            className="p-3 bg-white rounded-xl shadow-sm border border-pink-100 text-gray-700 text-sm"
                        >
                            {message}
                        </li>
                    ))}
                </ul>
            </div>

            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input id="username-1" name="username" defaultValue="@peduarte" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </div>
    );
};

export default GuestBookComponent;
