import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface Seat {
    sectionId: number;
    reserved: boolean;
    disabled: boolean;
}

interface CartItem {
    id: string;
    type: string;
    price: number;
}

interface Section {
    id: number;
    name: string;
    rows: string[];
    cols: number;
    startCol: number;
    priceType: string;
    customPrice: number | null;
}

interface SeatType {
    name: string;
    price: number;
    color: string;
}

interface SeatTypes {
    [key: string]: SeatType;
}

interface ContextMenu {
    x: number;
    y: number;
    seatId: string;
}

const SeatSection = () => {
    const [mode, setMode] = useState<"user" | "admin">("user");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);
    const [editingSection, setEditingSection] = useState<Section | null>(null);
    const [sections, setSections] = useState<Section[]>([
        {
            id: 1,
            name: "섹션 1",
            rows: ["A", "B", "C"],
            cols: 10,
            startCol: 1,
            priceType: "first",
            customPrice: null,
        },
        {
            id: 2,
            name: "섹션 2",
            rows: ["D", "E", "F", "G"],
            cols: 10,
            startCol: 1,
            priceType: "economy",
            customPrice: null,
        },
        {
            id: 3,
            name: "섹션 3",
            rows: ["H", "I", "J"],
            cols: 10,
            startCol: 1,
            priceType: "reduced",
            customPrice: null,
        },
    ]);

    const [seatTypes] = useState<SeatTypes>({
        first: { name: "First Class", price: 20000, color: "bg-blue-600" },
        economy: { name: "Economy", price: 15000, color: "bg-green-600" },
        reduced: { name: "Reduced", price: 10000, color: "bg-orange-500" },
    });

    const [seats, setSeats] = useState<{ [key: string]: Seat }>(() => {
        const initialSeats: { [key: string]: Seat } = {};
        sections.forEach((section) => {
            section.rows.forEach((row) => {
                for (let col = 1; col <= section.cols; col++) {
                    const seatId = `${row}${col}`;
                    if (row === "A" && (col === 4 || col === 5)) {
                        initialSeats[seatId] = { sectionId: section.id, reserved: true, disabled: false };
                    } else {
                        initialSeats[seatId] = { sectionId: section.id, reserved: false, disabled: false };
                    }
                }
            });
        });
        return initialSeats;
    });

    // Close context menu and edit modal on click outside
    // useEffect(() => {
    //     const handleClick = () => {
    //         setContextMenu(null);
    //     };
    //     document.addEventListener("click", handleClick);
    //     return () => document.removeEventListener("click", handleClick);
    // }, []);

    const getSectionForSeat = (seatId: string): Section | undefined => {
        const seat = seats[seatId];
        if (!seat) return undefined;
        return sections.find((s) => s.id === seat.sectionId);
    };

    const getSeatPrice = (seatId: string): number => {
        const section = getSectionForSeat(seatId);
        if (!section) return 0;

        if (section.customPrice) {
            return section.customPrice;
        }
        return seatTypes[section.priceType]?.price || 0;
    };

    const getSeatTypeName = (seatId: string): string => {
        const section = getSectionForSeat(seatId);
        if (!section) return "";

        if (section.customPrice) {
            return `${section.name} (커스텀)`;
        }
        return seatTypes[section.priceType]?.name || "";
    };

    const handleContextMenu = (e: React.MouseEvent, seatId: string) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            seatId: seatId,
        });
    };

    const toggleDisableSeat = (seatId: string) => {
        setSeats((prev) => ({
            ...prev,
            [seatId]: {
                ...prev[seatId],
                disabled: !prev[seatId].disabled,
            },
        }));
        setContextMenu(null);
    };

    const toggleSeat = (e: React.MouseEvent, seatId: string) => {
        if (mode === "admin") {
            handleContextMenu(e, seatId)
            return;
        }

        const seat = seats[seatId];
        if (seat.reserved || seat.disabled) return;

        const isInCart = cart.some((item) => item.id === seatId);
        if (isInCart) {
            setCart(cart.filter((item) => item.id !== seatId));
        } else {
            setCart([
                ...cart,
                {
                    id: seatId,
                    type: getSeatTypeName(seatId),
                    price: getSeatPrice(seatId),
                },
            ]);
        }
    };

    const removeFromCart = (seatId: string) => {
        setCart(cart.filter((item) => item.id !== seatId));
    };

    const updateSectionPrice = (sectionId: number, priceType: string, customPrice: number | null) => {
        setSections(sections.map((s) => (s.id === sectionId ? { ...s, priceType, customPrice } : s)));

        // 카트에 있는 해당 섹션의 좌석들 가격 업데이트
        setCart(
            cart.map((item) => {
                const seat = seats[item.id];
                if (seat && seat.sectionId === sectionId) {
                    const price = customPrice || seatTypes[priceType]?.price || 0;
                    const section = sections.find((s) => s.id === sectionId);
                    const typeName = customPrice ? `${section?.name} (커스텀)` : seatTypes[priceType]?.name || "";
                    return { ...item, price, type: typeName };
                }
                return item;
            }),
        );

        setEditingSection(null);
    };

    const addRowToSection = (sectionId: number) => {
        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    const lastRow = section.rows[section.rows.length - 1];
                    const nextRow = String.fromCharCode(lastRow.charCodeAt(0) + 1);

                    const newSeats = { ...seats };
                    for (let col = 1; col <= section.cols; col++) {
                        newSeats[`${nextRow}${col}`] = { sectionId: section.id, reserved: false, disabled: false };
                    }
                    setSeats(newSeats);

                    return { ...section, rows: [...section.rows, nextRow] };
                }
                return section;
            }),
        );

        setSections((prev) =>
            prev.map((s) => {
                if (s.id > sectionId) {
                    const newSeats = { ...seats };
                    s.rows.forEach((oldRow) => {
                        const newRow = String.fromCharCode(oldRow.charCodeAt(0) + 1);
                        for (let col = 1; col <= s.cols; col++) {
                            const oldSeatId = `${oldRow}${col}`;
                            const newSeatId = `${newRow}${col}`;
                            if (newSeats[oldSeatId]) {
                                newSeats[newSeatId] = newSeats[oldSeatId];
                                delete newSeats[oldSeatId];
                            }
                        }
                    });
                    setSeats(newSeats);

                    return {
                        ...s,
                        rows: s.rows.map((row) => String.fromCharCode(row.charCodeAt(0) + 1)),
                    };
                }
                return s;
            }),
        );
    };

    const addColToSection = (sectionId: number) => {
        setSections(
            sections.map((section) => {
                if (section.id === sectionId) {
                    const newCol = section.cols + 1;
                    const newSeats = { ...seats };

                    section.rows.forEach((row) => {
                        newSeats[`${row}${newCol}`] = { sectionId: section.id, reserved: false, disabled: false };
                    });

                    setSeats(newSeats);
                    return { ...section, cols: newCol };
                }
                return section;
            }),
        );
    };

    const addSection = () => {
        const lastSection = sections[sections.length - 1];
        const lastRow = lastSection.rows[lastSection.rows.length - 1];
        const newStartRow = String.fromCharCode(lastRow.charCodeAt(0) + 1);

        const newSection: Section = {
            id: sections.length + 1,
            name: `섹션 ${sections.length + 1}`,
            rows: [newStartRow],
            cols: 10,
            startCol: 1,
            priceType: "economy",
            customPrice: null,
        };

        const newSeats = { ...seats };
        for (let col = 1; col <= 10; col++) {
            newSeats[`${newStartRow}${col}`] = { sectionId: newSection.id, reserved: false, disabled: false };
        }

        setSeats(newSeats);
        setSections([...sections, newSection]);
    };

    const deleteSection = (sectionId: number) => {
        if (sections.length === 1) return;

        const sectionToDelete = sections.find((s) => s.id === sectionId);
        if (!sectionToDelete) return;

        const newSeats = { ...seats };

        sectionToDelete.rows.forEach((row) => {
            for (let col = 1; col <= sectionToDelete.cols; col++) {
                delete newSeats[`${row}${col}`];
            }
        });

        setSeats(newSeats);
        setSections(sections.filter((s) => s.id !== sectionId));
    };

    const getSeatColor = (seatId: string): string => {
        const seat = seats[seatId];
        if (!seat) return "bg-gray-300";

        if (seat.disabled) return "bg-transparent border-2 border-dashed border-gray-300";
        if (seat.reserved) return "bg-gray-300";

        const isInCart = cart.some((item) => item.id === seatId);
        if (isInCart) return "bg-red-400 ring-4 ring-red-500";

        const section = getSectionForSeat(seatId);
        if (!section) return "bg-gray-300";

        return seatTypes[section.priceType]?.color || "bg-gray-300";
    };

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="p-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setMode(mode === "user" ? "admin" : "user")}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        <Settings size={20} />
                        {mode === "user" ? "Admin 모드" : "User 모드"}
                    </button>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Seat Map */}
                    <div className="flex-1">
                        <div className="rounded-xl bg-white p-8 shadow-lg">
                            <div className="mb-8 rounded-lg bg-gray-100 py-3 text-center">
                                <span className="font-semibold text-gray-600">Front</span>
                            </div>

                            <div className="overflow-x-auto">
                                {sections.map((section) => (
                                    <div key={section.id} className="relative mb-8">
                                        <div className="mb-4 flex items-center justify-end gap-4">
                                            {mode === "admin" && (
                                                <>
                                                    <button
                                                        onClick={() => setEditingSection(section)}
                                                        className="flex items-center gap-2 rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
                                                    >
                                                        <Edit2 size={16} />
                                                        가격 설정
                                                    </button>

                                                    <button
                                                        onClick={() => deleteSection(section.id)}
                                                        className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex">
                                            <div>
                                                {section.rows.map((row) => (
                                                    <div key={row} className="mb-2 flex items-center gap-4">
                                                        <div className="w-8 text-center font-semibold text-gray-700">{row}</div>
                                                        <div className="flex gap-2">
                                                            {Array.from({ length: section.cols }, (_, i) => i + 1).map((col) => {
                                                                const seatId = `${row}${col}`;
                                                                const seat = seats[seatId];

                                                                if (!seat) {
                                                                    return <div key={seatId} className="h-12 w-12"></div>;
                                                                }

                                                                return (
                                                                    <button
                                                                        key={seatId}
                                                                        onClick={(e) => toggleSeat(e, seatId)}
                                                                        // onContextMenu={(e) => handleContextMenu(e, seatId)}
                                                                        disabled={(seat.reserved || seat.disabled) && mode === "user"}
                                                                        className={`h-12 w-12 rounded-lg text-sm font-semibold text-white transition-all ${getSeatColor(seatId)} ${
                                                                            !seat.reserved && !seat.disabled && mode === "user"
                                                                                ? "cursor-pointer hover:opacity-80"
                                                                                : ""
                                                                        } ${mode === "admin" ? "cursor-context-menu" : ""}`}
                                                                    >
                                                                        {!seat.disabled && seatId}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                                {mode === "admin" && (
                                                    <div className="mt-2 flex items-center gap-4">
                                                        <div className="w-8"></div>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => addRowToSection(section.id)}
                                                            className="flex items-center justify-center border-dashed border-2 border-gray-300 p-0"
                                                            style={{
                                                                width: `${section.cols * 48 + (section.cols - 1) * 8}px`,
                                                                height: "48px",
                                                            }}
                                                        >
                                                            <Plus size={20} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            {mode === "admin" && (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => addColToSection(section.id)}
                                                    className="ml-2 flex h-auto w-12 items-center justify-center border-dashed border-2 border-gray-300 p-0"
                                                    style={{
                                                        height: `${section.rows.length * 48 + (section.rows.length - 1) * 8}px`,
                                                    }}
                                                >
                                                    <Plus size={20} color="black" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {mode === "admin" && (
                                <button
                                    onClick={addSection}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-500 py-3 font-semibold text-white hover:bg-purple-600"
                                >
                                    <Plus size={20} />
                                    섹션 추가
                                </button>
                            )}
                        </div>

                        {/* Legend */}
                        <div className="mt-6 rounded-xl bg-white p-6 shadow-lg">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-blue-600"></div>
                                    <span className="font-medium">First Class (₩20,000)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-green-600"></div>
                                    <span className="font-medium">Economy (₩15,000)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-orange-500"></div>
                                    <span className="font-medium">Reduced (₩10,000)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-gray-300"></div>
                                    <span className="font-medium">Reserved</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cart */}
                    {mode === "user" && (
                        <div className="w-full lg:w-96">
                            <div className="sticky top-8 rounded-xl bg-white p-6 shadow-lg">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-800">Cart ({cart.length})</h2>
                                </div>

                                <div className="mb-6 space-y-3">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-12 w-12 ${getSeatColor(item.id)} flex items-center justify-center rounded-lg text-sm font-semibold text-white`}
                                                >
                                                    {item.id}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-800">{item.id}</div>
                                                    <div className="text-sm text-gray-600">{item.type}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold">₩{item.price.toLocaleString()}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {cart.length === 0 && (
                                    <div className="py-12 text-center text-gray-400">
                                        <p>장바구니가 비어있습니다</p>
                                    </div>
                                )}

                                {cart.length > 0 && (
                                    <>
                                        <div className="mb-4 border-t pt-4">
                                            <div className="flex items-center justify-between text-xl font-bold">
                                                <span>Total:</span>
                                                <span>₩{total.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <button className="w-full rounded-lg bg-red-500 py-4 text-lg font-bold text-white transition-colors hover:bg-red-600">
                                            Checkout
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && mode === "admin" && (
                <div
                    className="absolute z-10000 rounded-lg border border-gray-200 bg-white py-2 shadow-xl"
                    style={{ left: contextMenu.x - 30 + "px", top: contextMenu.y - 100 + "px" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={() => toggleDisableSeat(contextMenu.seatId)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    >
                        {seats[contextMenu.seatId]?.disabled ? "활성화" : "비활성화"}
                    </button>
                </div>
            )}

            {/* Price Edit Modal */}
            {editingSection && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-96 rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <h3 className="mb-4 text-xl font-bold">{editingSection.name} 가격 설정</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">가격 유형 선택</label>
                                <select
                                    value={editingSection.priceType}
                                    onChange={(e) => setEditingSection({ ...editingSection, priceType: e.target.value, customPrice: null })}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="first">First Class (₩20,000)</option>
                                    <option value="economy">Economy (₩15,000)</option>
                                    <option value="reduced">Reduced (₩10,000)</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">또는 커스텀 가격 입력</label>
                                <input
                                    type="number"
                                    placeholder="커스텀 가격 (원)"
                                    value={editingSection.customPrice || ""}
                                    onChange={(e) =>
                                        setEditingSection({
                                            ...editingSection,
                                            customPrice: e.target.value ? parseInt(e.target.value) : null,
                                        })
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button
                                    onClick={() =>
                                        updateSectionPrice(editingSection.id, editingSection.priceType, editingSection.customPrice)
                                    }
                                    className="flex-1 rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
                                >
                                    적용
                                </button>
                                <button
                                    onClick={() => setEditingSection(null)}
                                    className="flex-1 rounded-lg bg-gray-300 py-2 font-semibold text-gray-700 hover:bg-gray-400"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SeatSection;
