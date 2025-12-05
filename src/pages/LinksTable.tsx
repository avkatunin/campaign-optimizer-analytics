import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ChevronDown,
  Home,
  Plus,
  Instagram,
  Youtube,
  MessageCircle as Telegram,
  Link2,
  ExternalLink,
  Calendar,
  BarChart,
  Clock,
  Eye,
  Copy,
  Pencil,
  GripVertical,
  Check,
  User,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as Avatar from "@radix-ui/react-avatar";
import * as Tooltip from "@radix-ui/react-tooltip";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UserInfo } from "os";
import Logo from "@/components/Logo";

import "./style.css";

import {
  BarChart as RBarChart,
  Bar,
  Text,
  XAxis,
  YAxis,
  Tooltip as TooltipChart,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

interface Campaign {
  id: string;
  platform: "telegram" | "instagram" | "tiktok" | "youtube" | "vk" | "other";
  advertiser: string;
  advertiserLink?: string;
  startDate?: Date;
  cost?: number;
  postLink?: string;
  deeplink: string;
  totalViews: number;
  last3DaysViews: number;
  lastDayViews: number;
  durationDays: number;
}

interface Product {
  id: string;
  title: string;
  url: string;
  campaignsCount: number;
  campaigns: Campaign[];
  created: string;
}

interface UserProfile {
  paymentId: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  photoUrl: string;
  linksGeneratedMonth: number;
  linksGeneratedAll: number;
  linksLimit: number;
}

const SortableProductItem = ({
  product,
  isOpen,
  onToggle,
}: {
  product: Product;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function localDateFormat(utcTimestamp: string) {
    const dateObject = new Date(utcTimestamp);
    return dateObject.toLocaleString();
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-xl border border-gray-200 shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-center p-4">
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {product.title}
          </h2>
          <div className="flex flex-1 min-w-0 text-gray-500 text-sm">
            {localDateFormat(product.created)}
          </div>
          <div className="flex items-center mt-1">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary flex items-center gap-1 hover:underline truncate"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="truncate">{product.url}</span>
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <CollapsibleTrigger asChild>
            <button
              onClick={onToggle}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
    </div>
  );
};

const SortableCampaignRow = ({
  campaign,
  productId,
  onUpdatePostLink,
  onRefreshStats,
  isOpen,
  onToggle,
}: {
  campaign: Campaign;
  productId: string;
  onUpdatePostLink: (
    productId: string,
    campaignId: string,
    postLink: string
  ) => void;
  onRefreshStats: (productId: string, campaignId: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: campaign.id });

  const [isEditingPostLink, setIsEditingPostLink] = useState(false);
  const [postLinkValue, setPostLinkValue] = useState(campaign.postLink || "");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram":
        return <Telegram className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "vk":
        return <div className="w-4 h-4 font-bold text-xs">VK</div>;
      case "tiktok":
        return <div className="w-4 h-4 font-bold text-xs">TT</div>;
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано в буфер обмена");
  };

  const handleSavePostLink = () => {
    onUpdatePostLink(productId, campaign.id, postLinkValue);
    setIsEditingPostLink(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="RowCampaign bg-white border border-gray-200 shadow-md transition-all hover:shadow-lg"
    >
      <div className="flex items-center p-4">
        <div
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="flex flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-3">
            {getPlatformIcon(campaign.platform)}
          </div>
          <div>
            <div className="font-medium">
              {campaign.advertiserLink ? (
                <a
                  href={campaign.advertiserLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-primary"
                >
                  {campaign.advertiser}
                </a>
              ) : (
                campaign.advertiser
              )}
            </div>
            {isEditingPostLink ? (
              <div className="mt-1 flex items-center">
                <Input
                  value={postLinkValue}
                  onChange={(e) => setPostLinkValue(e.target.value)}
                  placeholder="https://t.me/example/100"
                  className="text-xs h-7 min-w-[200px]"
                />
                <button
                  onClick={handleSavePostLink}
                  className="ml-2 px-2 py-1 bg-primary text-white text-xs rounded hover:bg-primary/90"
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div className="flex items-center mt-1">
                {campaign.postLink ? (
                  <a
                    href={campaign.postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ссылка на пост
                  </a>
                ) : (
                  <button
                    onClick={() => setIsEditingPostLink(true)}
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Добавить ссылку на пост
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              {campaign.startDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(campaign.startDate, "dd.MM.yyyy")}
                </div>
              )}
              {campaign.cost && (
                <div className="flex items-center gap-1">
                  <span className="font-medium text-gray-600">
                    {campaign.cost.toLocaleString()}₽
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-1 min-w-0 gap-2">
          <div className="max-w-[215px] overflow-hidden">
            <div className="truncate text-gray-500 text-sm">
              {campaign.deeplink}
            </div>
          </div>
          <button
            onClick={() => copyToClipboard(campaign.deeplink)}
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Всего
            </div>
            <div className="font-semibold">
              {campaign.totalViews.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <BarChart className="w-3 h-3" />
              3дня
            </div>
            <div className="font-semibold">
              {campaign.last3DaysViews.toLocaleString()}
            </div>
          </div>

          <div className="bg-gray-50 p-2 rounded-lg">
            <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              24часа
            </div>
            <div className="font-semibold">
              {campaign.lastDayViews.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => onRefreshStats(productId, campaign.id)}
            className="ml-4 p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <CollapsibleTrigger asChild>
            <button
              onClick={onToggle}
              className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronDown
                className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
          </CollapsibleTrigger>
        </div>
      </div>
    </div>
  );
};

const LinksTable = () => {
  useEffect(() => {
    //const tg = document.createElement('div');
    //tg.id = 'telegram';

    //document.getElementById("auth").appendChild(tg);
    axios
      .get("https://app.vneshka.pro/api/v1/controlpanel/cookie/agreement")
      .then((response) => {
        if (response.data.username == null) {
          setIsCookieAgreementAccepted(response.data.result);
        }
      });

    axios
      .get("https://app.vneshka.pro/api/v1/controlpanel/profile/me")
      .then((response) => {
        setUserProfile(response.data);
        if (response.data.username == null) {
          const scriptElement = document.createElement("script");
          scriptElement.id = "tg-auth-widget";
          scriptElement.src = "https://telegram.org/js/telegram-widget.js?22";
          scriptElement.setAttribute("data-telegram-login", "VneshkaProBot");
          scriptElement.setAttribute("data-size", "large");
          scriptElement.setAttribute(
            "data-onauth",
            "TelegramLoginWidget.dataOnauth(user)"
          );
          scriptElement.setAttribute("data-request-access", "write");

          document.getElementById("telegram").appendChild(scriptElement);
        } else {
          axios
            .get("https://app.vneshka.pro/api/v1/controlpanel/profile/photo")
            .then((response1) => {
              console.log("Status Code:", response1.status);
              setIsUserPhotoAvaliable(true);
            })
            .catch((error) => {
              setIsUserPhotoAvaliable(false);
              console.error("Error:", error);
            });
          fetchData();
        }
      });
  }, []);

  const COLORS10 = [
    "#a6cee3",
    "#1f78b4",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
    "#cab2d6",
    "#6a3d9a",
  ];

  const [dataViews, setDataViews] = useState([]);
  const [dataCityViews, setDataCityViews] = useState([]);

  const getDataViews = async (id: string) => {
    const { data } = await axios(
      "https://app.vneshka.pro/api/v1/controlpanel/campaigns/" + id
    );
    setDataViews(data);
  };
  const getDataCityViews = async (id: string) => {
    const { data } = await axios(
      "https://app.vneshka.pro/api/v1/controlpanel/campaigns/" + id + "/cities"
    );
    setDataCityViews(data);
  };

  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      console.log("LinksTable");
      const response = await axios.get(
        "https://app.vneshka.pro/api/v1/controlpanel/products"
      ); // Замените на реальный URL
      setProducts(response.data); // Сохраняем полученные данные в состоянии
    } catch (error) {
      alert("error");
      setProducts([]);
    }
  };

  window.TelegramLoginWidget = {
    dataOnauth: (user) => handleTelegramResponse(user),
  };

  const handleTelegramResponse = async (user) => {
    //document.getElementById("telegram").remove();

    const params = new URLSearchParams();
    params.append("id", user.id);
    params.append("firstName", user.first_name);
    params.append("username", user.username);
    params.append("photoUrl", user.photo_url);
    params.append("authDate", user.auth_date);
    params.append("hash", user.hash);
    params.append("authParams", user);

    const response = await axios.post(
      "https://app.vneshka.pro/api/v1/controlpanel/auth/telegram",
      user
    );

    fetchUserProfile();
    fetchData();

    document.getElementById("telegram-login-VneshkaProBot").remove();
    // Вызываем функцию получения данных
  };

  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  const [openCollapsibleCampaign, setOpenCollapsibleCampaign] = useState<
    string | null
  >(null);
  const [newProduct, setNewProduct] = useState({ title: "", url: "" });
  const [newCampaign, setNewCampaign] = useState<{
    productId: string;
    platform: "telegram" | "instagram" | "tiktok" | "youtube" | "vk" | "other";
    advertiser: string;
    advertiserLink: string;
    startDate: string;
    cost: string;
  }>({
    productId: "",
    platform: "telegram",
    advertiser: "",
    advertiserLink: "",
    startDate: "",
    cost: "",
  });

  const [isUserPhotoAvaliable, setIsUserPhotoAvaliable] = useState(false);
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
  const [isAddCampaignDialogOpen, setIsAddCampaignDialogOpen] = useState(false);
  const [isCookieAgreementDialogOpen, setIsCookieAgreementDialogOpen] =
    useState(false);
  const [isGeneratedLinkDialogOpen, setIsGeneratedLinkDialogOpen] =
    useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [isLimitExceededDialogOpen, setIsLimitExceededDialogOpen] =
    useState(false);
  const [isRefreshingStats, setIsRefreshingStats] = useState<string | null>(
    null
  );
  const [isCookieAgreementAccepted, setIsCookieAgreementAccepted] =
    useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({});

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        "https://app.vneshka.pro/api/v1/controlpanel/profile/me"
      ); // Замените на реальный URL
      setUserProfile(response.data);
    } catch (error) {
      alert("error");
    }
  };

  const fetchUserProfilePhoto = async () => {
    try {
      const response = await axios.get(
        "https://app.vneshka.pro/api/v1/controlpanel/profile/photo"
      ); // Замените на реальный URL
      setIsUserPhotoAvaliable(true);
      console.log("Ok user photo");
      // Сохраняем полученные данные в состоянии
    } catch (error) {
      console.log("Error user photo");
      setIsUserPhotoAvaliable(false);
    }
  };

  const toggleCollapsible = (id: string) => {
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      refreshAllCampaignsStats(id);
      setOpenCollapsible(id);
    }
  };

  const toggleCollapsibleCampaign = (id: string) => {
    if (openCollapsibleCampaign === id) {
      setOpenCollapsibleCampaign(null);
    } else {
      setOpenCollapsibleCampaign(id);
    }
    getDataViews(id);
    getDataCityViews(id);
  };

  const toggleCollapsibleFake = (id: string) => {
    if (openCollapsible === id) {
      setOpenCollapsible(null);
    } else {
      setOpenCollapsible(id);
    }
  };

  const urlRegex =
    /^(https?:\/\/)?(www\.)?(wildberries\.ru|ozon\.ru|market\.yandex\.ru|megamarket\.ru|aliexpress\.ru|lamoda\.ru|avito\.ru)(\/[^\s?]*)?(\?[^\s]*)?(#\S*)?$/;

  const handleAddProduct = async () => {
    document.getElementById("invalidUrl").style.display = "none";
    if (!newProduct.title || !newProduct.url) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const isValid = urlRegex.test(newProduct.url);

    if (!isValid) {
      document.getElementById("invalidUrl").style.display = "block";
      toast.error("Ссылка на товар маркетплейса недействительна.");
      return;
    }

    const newProductObj: Product = {
      title: newProduct.title,
      url: newProduct.url,
      campaigns: [],
    };

    const response = await axios.post(
      "https://app.vneshka.pro/api/v1/controlpanel/products",
      newProductObj
    );

    const newRow = response.data;

    setProducts([newRow, ...products]);
    setNewProduct({ title: "", url: "" });
    toast.success("Товар успешно добавлен");

    setIsAddProductDialogOpen(false);
  };

  const handleIsAvaliableAddCampaign = () => {
    if (userProfile.linksLimit <= 0) {
      setIsAddCampaignDialogOpen(false);
      setIsLimitExceededDialogOpen(true);
    } else {
      setIsAddCampaignDialogOpen(true);
      setIsLimitExceededDialogOpen(false);
    }
    //fix hear
  };

  const handleAddCampaign = async () => {
    if (
      !newCampaign.productId ||
      !newCampaign.advertiser ||
      !newCampaign.platform
    ) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }

    const newCampaignObj: Campaign = {
      platform: newCampaign.platform,
      advertiser: newCampaign.advertiser,
      advertiserLink: newCampaign.advertiserLink,
      startDate: newCampaign.startDate
        ? new Date(newCampaign.startDate)
        : undefined,
      cost: newCampaign.cost ? Number(newCampaign.cost) : 0,
    };

    const response = await axios.post(
      "https://app.vneshka.pro/api/v1/controlpanel/products/" +
        newCampaign.productId +
        "/deeplink",
      newCampaignObj
    );

    const newRow = response.data;

    const updatedProducts = products.map((product) => {
      if (product.id === newCampaign.productId) {
        return {
          ...product,
          campaigns: [newRow, ...product.campaigns],
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setGeneratedLink(newRow.deeplink);
    userProfile.linksLimit -= 1;

    setNewCampaign({
      productId: "",
      platform: "telegram",
      advertiser: "",
      advertiserLink: "",
      startDate: "",
      cost: "",
    });

    setIsAddCampaignDialogOpen(false);
    setIsGeneratedLinkDialogOpen(true);

    toast.success("Кампания успешно добавлена");
  };

  const updateCampaignPostLink = async (
    productId: string,
    campaignId: string,
    postLink: string
  ) => {
    if (!postLink) {
      toast.error("Пожалуйста, заполните ссылку");
      return;
    }

    const newCampaignObj: Campaign = {
      postLink: postLink,
    };

    const response = await axios.post(
      "https://app.vneshka.pro/api/v1/controlpanel/products/" +
        productId +
        "/campaigns/" +
        campaignId +
        "/post-link",
      newCampaignObj
    );

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedCampaigns = product.campaigns.map((campaign) => {
          if (campaign.id === campaignId) {
            campaign = response.data;
          }
          return campaign;
        });

        return {
          ...product,
          campaigns: updatedCampaigns,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    toast.success("Ссылка на пост добавлена");
  };

  const refreshCampaignStats = async (
    productId: string,
    campaignId: string
  ) => {
    const response = await axios.get(
      "https://app.vneshka.pro/api/v1/controlpanel/products/" +
        productId +
        "/campaigns/" +
        campaignId
    );

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        const updatedCampaigns = product.campaigns.map((campaign) => {
          if (campaign.id === campaignId) {
            campaign = response.data;
          }
          return campaign;
        });

        return {
          ...product,
          campaigns: updatedCampaigns,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    toast.success("Статистика успешно обновлена");
  };

  const refreshAllCampaignsStats = async (productId: string) => {
    setIsRefreshingStats(productId);

    const response = await axios.get(
      "https://app.vneshka.pro/api/v1/controlpanel/products/" + productId
    );

    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        product = response.data;
      }
      return product;
    });

    setProducts(updatedProducts);
    setIsRefreshingStats(null);
    toast.success("Статистика всех кампаний обновлена");
  };

  const moveProduct = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === products.length - 1)
    ) {
      return;
    }

    const newProducts = [...products];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newProducts[index], newProducts[targetIndex]] = [
      newProducts[targetIndex],
      newProducts[index],
    ];
    setProducts(newProducts);
  };

  const moveCampaign = (
    productId: string,
    campaignIndex: number,
    direction: "up" | "down"
  ) => {
    const productIndex = products.findIndex((p) => p.id === productId);
    if (productIndex === -1) return;

    const campaigns = [...products[productIndex].campaigns];
    if (
      (direction === "up" && campaignIndex === 0) ||
      (direction === "down" && campaignIndex === campaigns.length - 1)
    ) {
      return;
    }

    const targetIndex =
      direction === "up" ? campaignIndex - 1 : campaignIndex + 1;
    [campaigns[campaignIndex], campaigns[targetIndex]] = [
      campaigns[targetIndex],
      campaigns[campaignIndex],
    ];

    const updatedProducts = [...products];
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      campaigns,
    };

    setProducts(updatedProducts);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Скопировано в буфер обмена");
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success("Товар удален");
  };

  const deleteCampaign = (productId: string, campaignId: string) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          campaigns: product.campaigns.filter((c) => c.id !== campaignId),
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    toast.success("Кампания удалена");
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "telegram":
        return <Telegram className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "vk":
        return <div className="w-4 h-4 font-bold text-xs">VK</div>;
      case "tiktok":
        return <div className="w-4 h-4 font-bold text-xs">TT</div>;
      default:
        return <Link2 className="w-4 h-4" />;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleProductDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const myStyle = {
    textDecorationLine: "line-through",
  };

  const tableStyle = {
    minWidth: "765px",
  };

  const invalidUrlStyle = {
    display: "none",
  };

  const handleProductUrlChange = (e) => {
    document.getElementById("invalidUrl").style.display = "none";
    setNewProduct({ ...newProduct, url: e.target.value });
  };

  const handleCampaignDragEnd = (event: DragEndEvent, productId: string) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProducts((products) => {
        return products.map((product) => {
          if (product.id === productId) {
            const oldIndex = product.campaigns.findIndex(
              (campaign) => campaign.id === active.id
            );
            const newIndex = product.campaigns.findIndex(
              (campaign) => campaign.id === over.id
            );

            return {
              ...product,
              campaigns: arrayMove(product.campaigns, oldIndex, newIndex),
            };
          }
          return product;
        });
      });
    }
  };

  const cookiesAccepted = async () => {
    await axios.post(
      "https://app.vneshka.pro/api/v1/controlpanel/cookie/agreement"
    );
    setIsCookieAgreementAccepted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="DisplayFlex items-center gap-4">
              <Logo />
              <Link
                to="https://t.me/vneshkapro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Связаться с нами</span>
              </Link>
            </div>

            {userProfile.username != null ? (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary">
                  <Link2 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Доступно кампаний: {userProfile.linksLimit}
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 text-gray-700"
                  id="auth"
                >
                  {userProfile.username != null ? (
                    <Tooltip.Provider
                      delayDuration={100}
                      skipDelayDuration={500}
                    >
                      <Tooltip.Root>
                        <Tooltip.Trigger>
                          <Avatar.Root className="AvatarRoot">
                            {isUserPhotoAvaliable ? (
                              <Avatar.Image
                                src={userProfile.photoUrl}
                                alt={userProfile.firstName}
                                className="AvatarImage"
                                onLoadingStatusChange={(s) => {
                                  // ожидаемые значения: "loading" | "loaded" | "error"
                                  console.log("avatar status:", s);
                                }}
                              />
                            ) : (
                              <Avatar.Fallback className="AvatarFallback">
                                {userProfile.firstName
                                  .trim()
                                  .charAt(0)
                                  .toUpperCase()}
                              </Avatar.Fallback>
                            )}
                          </Avatar.Root>
                        </Tooltip.Trigger>
                        <Tooltip.Content
                          side="bottom"
                          className="TooltipContent"
                        >
                          <div className="py-4">
                            <p className="text-gray-600 mb-4">
                              {userProfile.firstName}, информация по вашему
                              профилю:
                            </p>
                            <p className="text-gray-600 mb-4">
                              Ссылок в этом месяце:{" "}
                              {userProfile.linksGeneratedMonth}
                            </p>
                            <p className="text-gray-600 mb-4">
                              Всего ссылок: {userProfile.linksGeneratedAll}
                            </p>
                            <p className="text-gray-600 mb-4">
                              Ваш идентификатор для оплаты:{" "}
                              {userProfile.paymentId}
                            </p>
                          </div>
                          <Tooltip.Arrow
                            className="TooltipArrow"
                            sideOffset={5}
                          />
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  ) : (
                    <div id="telegram"></div>
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </nav>
      {isCookieAgreementAccepted === false ? (
        <nav className="mb-2 fixed bottom-0 w-full rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl z-50 border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="DisplayFlex items-center justify-between">
              <div className="flex items-center gap-4 mr-4">
                <div className="text-sm bg-gradient-primary text-gray-600">
                  Наш сайт использует файлы cookies. Нажимая кнопку «Принять»
                  или продолжая пользоваться данным сайтом, вы соглашаетесь на
                  обработку файлов «Cookie».
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary"
                  onClick={cookiesAccepted}
                >
                  <span className="text-sm font-medium">Принять</span>
                </button>
                <Dialog
                  open={isCookieAgreementDialogOpen}
                  onOpenChange={setIsCookieAgreementDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="text-sm font-medium flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary">
                      Подробнее
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] text-sm">
                    <DialogHeader>
                      <DialogTitle className="text-m font-display">
                        Политика использования файлов «Cookie»
                      </DialogTitle>
                    </DialogHeader>
                    <p className="text-gray-500">
                      Файлы «Cookie» представляют собой небольшие фрагменты
                      информации, которые размещаются на вашем компьютере при
                      посещении определенных веб-сайтов. Файлы «Cookie»
                      используются для улучшения персонализации и
                      интерактивности в предоставлении информации на сайте.
                    </p>
                    <p className="text-gray-500">
                      При первом посещении данного сайта, с помощью нового
                      браузера или в режиме приватного просмотра предоставляется
                      баннер, запрашивающий ваше согласие на обработку файлов
                      «Cookie» в соответствии с требованиями законодательства.
                      Нажав кнопку «Принять» или продолжая пользоваться данным
                      сайтом, вы соглашаетесь на размещение файлов «Cookie».
                    </p>
                    <p className="text-gray-500">
                      Использование файлов «Cookie» может быть отключено в
                      интернет-обозревателе (просим вас ознакомиться с данной
                      возможностью в разделе «Справка» вашего браузера). При
                      отключении использования файлов «Cookie» могут быть
                      недоступны некоторые функции сайта. Сторонние организации
                      не имеют доступа к файлам «Cookie» нашего сайта.
                    </p>
                    <p className="text-gray-500">
                      Сторонние организации (например, Microsoft, Google, Yandex
                      и т.п.), которые размещают собственные файлы «Cookie»,
                      включая ваш браузер, имеют собственные политики
                      использования файлов «Cookie».
                    </p>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <div></div>
      )}

      {userProfile.username != null ? (
        <div className="container mx-auto px-6 pt-24 pb-20">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent DisplayFlex justify-between items-center">
              <div>
                <h1 className="font-display text-2xl font-bold text-gray-900">
                  Ваши товары и рекламные кампании
                </h1>
                <p className="text-gray-600 mt-1 mb-2">
                  Ведите учет рекламных кампаний и отслеживайте их эффективность
                </p>
              </div>
              <Dialog
                open={isAddProductDialogOpen}
                onOpenChange={setIsAddProductDialogOpen}
              >
                <DialogTrigger asChild>
                  <button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-all duration-300 px-6 py-2.5 rounded-full text-white font-medium shadow-lg flex items-center gap-2 hover:shadow-xl transform hover:scale-105">
                    <Plus className="w-4 h-4" />
                    Добавить товар
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-display">
                      Добавить новый товар
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Наименование товара *
                      </label>
                      <Input
                        id="title"
                        value={newProduct.title}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            title: e.target.value,
                          })
                        }
                        placeholder="Введите название товара или услуги"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="url" className="text-sm font-medium">
                        Ссылка на товар *
                      </label>
                      <Input
                        id="url"
                        value={newProduct.url}
                        onChange={handleProductUrlChange}
                        placeholder="https://example.com/product"
                        className="rounded-lg"
                      />
                    </div>
                    <div id="invalidUrl" style={invalidUrlStyle}>
                      <div className="flex gap-2">
                        <p className="text-gray-600 mt-1 mb-1 ">
                          Ссылка на товар маркетплейса недействительна.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleAddProduct}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md flex items-center justify-center"
                  >
                    Добавить
                  </button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-md">
                <p className="text-gray-500">
                  У вас пока нет добавленных товаров. Нажмите "Добавить товар",
                  чтобы начать.
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleProductDragEnd}
              >
                <SortableContext
                  items={products.map((product) => product.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {products.map((product) => (
                    <Collapsible
                      key={product.id}
                      open={openCollapsible === product.id}
                      onOpenChange={() => toggleCollapsible(product.id)}
                    >
                      <SortableProductItem
                        product={product}
                        isOpen={openCollapsible === product.id}
                        onToggle={() => toggleCollapsibleFake(product.id)}
                      />

                      <CollapsibleContent>
                        <div className="pl-10 pr-2 py-3 animate-fade-up">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-700">
                                Рекламные кампании
                              </h3>
                              <button
                                onClick={() =>
                                  refreshAllCampaignsStats(product.id)
                                }
                                className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                                disabled={isRefreshingStats === product.id}
                              >
                                <RefreshCw
                                  className={`w-4 h-4 ${
                                    isRefreshingStats === product.id
                                      ? "animate-spin"
                                      : ""
                                  }`}
                                />
                              </button>
                            </div>

                            <button
                              onClick={handleIsAvaliableAddCampaign}
                              className="bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 text-primary transition-colors px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 shadow-sm hover:shadow-md"
                            >
                              <Plus className="w-4 h-4" />
                              Добавить кампанию
                            </button>

                            <Dialog
                              open={isAddCampaignDialogOpen}
                              onOpenChange={setIsAddCampaignDialogOpen}
                            >
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle className="text-xl font-display">
                                    Новая рекламная кампания
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <input
                                    type="hidden"
                                    value={product.id}
                                    onChange={() =>
                                      setNewCampaign({
                                        ...newCampaign,
                                        productId: product.id,
                                      })
                                    }
                                  />
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <label
                                        htmlFor="platform"
                                        className="text-sm font-medium"
                                      >
                                        Площадка *
                                      </label>
                                      <select
                                        id="platform"
                                        value={newCampaign.platform}
                                        onChange={(e) =>
                                          setNewCampaign({
                                            ...newCampaign,
                                            productId: product.id,
                                            platform: e.target.value as any,
                                          })
                                        }
                                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                      >
                                        <option value="telegram">
                                          Telegram
                                        </option>
                                        <option value="instagram">
                                          Instagram
                                        </option>
                                        <option value="tiktok">TikTok</option>
                                        <option value="youtube">YouTube</option>
                                        <option value="vk">VK</option>
                                        <option value="other">Другое</option>
                                      </select>
                                    </div>
                                    <div className="grid gap-2">
                                      <label
                                        htmlFor="advertiser"
                                        className="text-sm font-medium"
                                      >
                                        Блогер *
                                      </label>
                                      <Input
                                        id="advertiser"
                                        value={newCampaign.advertiser}
                                        onChange={(e) =>
                                          setNewCampaign({
                                            ...newCampaign,
                                            productId: product.id,
                                            advertiser: e.target.value,
                                          })
                                        }
                                        placeholder="Например: beauty_blog"
                                        className="rounded-lg"
                                      />
                                    </div>
                                  </div>
                                  <div className="grid gap-2">
                                    <label
                                      htmlFor="advertiserLink"
                                      className="text-sm font-medium"
                                    >
                                      Ссылка на профиль блогера
                                    </label>
                                    <Input
                                      id="advertiserLink"
                                      value={newCampaign.advertiserLink}
                                      onChange={(e) =>
                                        setNewCampaign({
                                          ...newCampaign,
                                          productId: product.id,
                                          advertiserLink: e.target.value,
                                        })
                                      }
                                      placeholder="https://t.me/example"
                                      className="rounded-lg"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <label
                                        htmlFor="startDate"
                                        className="text-sm font-medium"
                                      >
                                        Дата начала
                                      </label>
                                      <Input
                                        id="startDate"
                                        type="date"
                                        value={newCampaign.startDate}
                                        onChange={(e) =>
                                          setNewCampaign({
                                            ...newCampaign,
                                            productId: product.id,
                                            startDate: e.target.value,
                                          })
                                        }
                                        className="rounded-lg"
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <label
                                        htmlFor="cost"
                                        className="text-sm font-medium"
                                      >
                                        Стоимость размещения (₽)
                                      </label>
                                      <Input
                                        id="cost"
                                        type="number"
                                        value={newCampaign.cost}
                                        onChange={(e) =>
                                          setNewCampaign({
                                            ...newCampaign,
                                            productId: product.id,
                                            cost: e.target.value,
                                          })
                                        }
                                        placeholder="Например: 15000"
                                        className="rounded-lg"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={handleAddCampaign}
                                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md flex items-center justify-center"
                                >
                                  Сгенерировать ссылку
                                </button>
                              </DialogContent>
                            </Dialog>
                          </div>

                          {product.campaignsCount === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                              <p className="text-gray-500">
                                У данного товара пока нет кампаний. Нажмите
                                "Добавить кампанию", чтобы создать.
                              </p>
                            </div>
                          ) : (
                            <div className="ContainerCampaign bg-white rounded-xl border border-gray-200 shadow-sm">
                              <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) =>
                                  handleCampaignDragEnd(event, product.id)
                                }
                              >
                                <SortableContext
                                  items={product.campaigns.map(
                                    (campaign) => campaign.id
                                  )}
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="RowCampaign bg-white border border-gray-200 shadow-md transition-all hover:shadow-lg flex">
                                    <div className="w-[5%]"></div>
                                    <div className="flex flex-1 min-w-0 text-gray-500 text-sm p-4">
                                      Кампания
                                    </div>
                                    <div className="flex flex-1 min-w-0 text-gray-500 text-sm p-4">
                                      Уникальная ссылка
                                    </div>
                                    <div className="flex flex-1 min-w-0 text-gray-500 text-sm p-4">
                                      Статистика переходов
                                    </div>
                                  </div>
                                  {product.campaigns.map((campaign) => (
                                    <Collapsible
                                      key={campaign.id}
                                      open={
                                        openCollapsibleCampaign === campaign.id
                                      }
                                      onOpenChange={() =>
                                        toggleCollapsibleCampaign(campaign.id)
                                      }
                                    >
                                      <SortableCampaignRow
                                        key={campaign.id}
                                        campaign={campaign}
                                        productId={product.id}
                                        onUpdatePostLink={
                                          updateCampaignPostLink
                                        }
                                        onRefreshStats={refreshCampaignStats}
                                        isOpen={
                                          openCollapsibleCampaign ===
                                          campaign.id
                                        }
                                        onToggle={() =>
                                          toggleCollapsibleCampaign(campaign.id)
                                        }
                                      />
                                      <CollapsibleContent>
                                        {dataViews.length === 0 ? (
                                          <div>
                                            Данные для визуализации отсутствуют
                                          </div>
                                        ) : (
                                          <div className="RowCampaign flex">
                                            <div className="w-[15%]"></div>
                                            <div className="p-4 w-full h-[360px]">
                                              <div className="flex flex-1 min-w-0 text-gray-500 text-sm p-4">
                                                Распределение количества
                                                переходов по дням и городам
                                              </div>
                                              <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                              >
                                                <RBarChart
                                                  data={dataViews}
                                                  barCategoryGap={16}
                                                >
                                                  <Text
                                                    x={200}
                                                    y={30}
                                                    dy={8}
                                                    textAnchor="middle"
                                                    fontSize="18"
                                                    fill="#333"
                                                  >
                                                    My Bar Chart Title
                                                  </Text>
                                                  <CartesianGrid strokeDasharray="3 3" />
                                                  <XAxis dataKey="period" />
                                                  <YAxis
                                                    allowDecimals={false}
                                                  />
                                                  <TooltipChart />
                                                  <Bar
                                                    dataKey="views"
                                                    fill="hsl(var(--primary))"
                                                    radius={[6, 6, 0, 0]}
                                                  />
                                                </RBarChart>
                                              </ResponsiveContainer>
                                            </div>
                                            <div className="w-[15%]"></div>
                                          </div>
                                        )}
                                        {dataCityViews.length === 0 ? (
                                          <div></div>
                                        ) : (
                                          <div className="RowCampaign flex">
                                            <div className="w-[10%]"></div>
                                            <div className="p-4 w-full h-[480px]">
                                              <ResponsiveContainer
                                                width="100%"
                                                height="100%"
                                              >
                                                <PieChart>
                                                  <Text
                                                    x={200}
                                                    y={30}
                                                    dy={8}
                                                    textAnchor="middle"
                                                    fontSize="18"
                                                    fill="#333"
                                                  >
                                                    My Bar Chart Title
                                                  </Text>
                                                  <Pie
                                                    data={dataCityViews}
                                                    dataKey="views"
                                                    nameKey="city"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={140}
                                                    innerRadius={20} // уберите для обычного pie без «дырки»
                                                    paddingAngle={2}
                                                    label
                                                  >
                                                    {dataCityViews.map(
                                                      (entry, i) => (
                                                        <Cell
                                                          key={`cell-${i}`}
                                                          fill={
                                                            COLORS10[i] ??
                                                            COLORS10[
                                                              COLORS10.length -
                                                                1
                                                            ]
                                                          }
                                                          stroke="none"
                                                        />
                                                      )
                                                    )}
                                                  </Pie>
                                                  <TooltipChart />
                                                  <Legend
                                                    verticalAlign="bottom"
                                                    height={28}
                                                  />
                                                </PieChart>
                                              </ResponsiveContainer>
                                            </div>
                                            <div className="w-[10%]"></div>
                                          </div>
                                        )}
                                      </CollapsibleContent>
                                    </Collapsible>
                                  ))}
                                </SortableContext>
                              </DndContext>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-6 pt-24 pb-20">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent DisplayFlex justify-between items-center">
              <div>
                <h1 className="font-display text-xl font-bold text-gray-900">
                  Войдите с помощью Telegram для быстрого и надежного доступа
                </h1>
                <p className="text-gray-600 mt-1">
                  Просто нажмите кнопку и подтвердите свою личность через ваш
                  аккаунт Telegram
                </p>
              </div>
              <div id="telegram"></div>
            </div>
          </div>
        </div>
      )}
      {/* Generated Link Dialog */}
      <Dialog
        open={isGeneratedLinkDialogOpen}
        onOpenChange={setIsGeneratedLinkDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">
              Ссылка сгенерирована
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">
              Ваша уникальная ссылка для рекламной кампании создана. Скопируйте
              ее и передайте рекламоразместителю:
            </p>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <div className="flex-1 overflow-hidden">
                <div className="truncate text-gray-800 font-medium">
                  {generatedLink}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(generatedLink)}
                className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="bg-primary/5 p-4 rounded-lg">
            <h4 className="flex items-center gap-2 font-medium text-primary mb-2">
              <Check className="w-4 h-4" />
              Что дальше?
            </h4>
            <p className="text-sm text-gray-600">
              Когда рекламная кампания будет запущена, добавьте ссылку на пост,
              чтобы легко отслеживать источник трафика.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Limit Exceeded Dialog */}
      <Dialog
        open={isLimitExceededDialogOpen}
        onOpenChange={setIsLimitExceededDialogOpen}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-destructive">
              У вас нет доступных ссылок
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-4">1 ссылка: 299₽</p>
            <p className="text-gray-600 mb-4">
              5 ссылок: 1 349₽ <span style={myStyle}>1 495₽</span>
            </p>
            <p className="text-gray-600 mb-4">
              10 ссылок: 2 399₽ <span style={myStyle}>2 990₽ </span>
            </p>
            <p className="text-gray-600 mb-4">
              20 ссылок: 4 199₽ <span style={myStyle}>5 980₽</span>
            </p>
          </div>
          <button
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition-colors text-white font-medium py-2.5 rounded-lg shadow-md flex items-center justify-center"
            onClick={() => window.open("https://t.me/vneshkapro", "_blank")}
          >
            Перейти к оплате
          </button>
          <p className="text-gray-600 mb-4">
            Сообщите менеджеру ваш идентификатор для оплаты:{" "}
            {userProfile.paymentId}
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinksTable;
