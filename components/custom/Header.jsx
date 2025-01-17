import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Colors from '@/data/Colors';
import { UserDetailContext } from '@/context/UserDetailContext';
import Link from 'next/link';
import { LucideDownload, Rocket, Github } from 'lucide-react';
import { useSidebar } from '../ui/sidebar';
import { usePathname } from 'next/navigation';
import { ActionContext } from '@/context/ActionContext';
import SignInDialog from './SignInDialog';
import { useMutation } from "convex/react";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  // Mutaciones de Convex
  const storeGitHubToken = useMutation("storeGitHubToken");
  const createGitHubRepo = useMutation("createGitHubRepo");

  // Manejar la URL después de la autenticación con GitHub
  useEffect(() => {
    const saveTokenFromURL = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          // Llama a tu API para intercambiar el código por un token de acceso
          const response = await fetch(`/api/auth/callback?code=${code}`);
          const data = await response.json();
          const token = data.token;

          // Guarda el token en Convex
          await storeGitHubToken({ userId: userDetail.id, token });

          alert("Conexión con GitHub exitosa y token guardado.");
        } catch (error) {
          console.error("Error guardando el token de GitHub:", error);
        }
      }
    };

    saveTokenFromURL();
  }, [storeGitHubToken, userDetail]);

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  const connectToGitHub = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "TU_CLIENT_ID";
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI || "http://localhost:3000/api/auth/callback";
  window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
  };

  const handleCreateRepo = async () => {
    try {
      const repoName = "nuevo-repositorio";
      const result = await createGitHubRepo({ userId: userDetail.id, repoName });
      alert(`Repositorio creado exitosamente: ${result.html_url}`);
    } catch (error) {
      console.error("Error al crear el repositorio:", error);
    }
  };

  return (
    <div className='p-4 flex justify-between items-center border-b'>
      <Link href={'/'}>
        <Image src={'/logo.png'} alt='Logo' width={40} height={40} />
      </Link>
      {!userDetail?.name ? (
        <div className='flex gap-5'>
          <Button variant="ghost" onClick={setOpenLoginDialog}>Sign In</Button>
          <Button onClick={setOpenLoginDialog}
            className="text-white" style={{
              backgroundColor: Colors.BLUE,
            }}>Get Started</Button>
        </div>
      ) : (
        path?.includes('workspace') &&
        <div className='flex gap-2 items-center'>
          <Button variant="ghost" onClick={() => onActionBtn('export')}><LucideDownload /> Export</Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => onActionBtn('deploy')}><Rocket /> Deploy</Button>
          {/* Botón de GitHub al lado del ícono de usuario */}
          <div className='flex items-center gap-2'>
            <Button className="bg-gray-900 text-white hover:bg-gray-800"
              onClick={connectToGitHub}><Github /> Connect to GitHub</Button>
            
            <Image src={userDetail?.picture} alt='user' width={30} height={30}
              className='rounded-full w-[30px] cursor-pointer'
              onClick={toggleSidebar}
            />
          </div>
        </div>
      )}
      <SignInDialog openDialog={openLoginDialog} closeDialog={setOpenLoginDialog} />
    </div>
  );
}

export default Header;
