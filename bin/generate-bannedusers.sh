#!/bin/bash
for i in {1..200}
do
   ngcp-kamcmd lb htable.sets auth "user$i@domain.com::auth_count" 10
done
